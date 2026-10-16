const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');

const User = require('../hotel-express-app/models/User');
const Room = require('../hotel-express-app/models/Room');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
}))

mongoose.connect('mongodb://127.0.0.1:27017/hotelManagementDB')
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err));

app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashpass = await bcrypt.hash(password, 10);

    await User.create({
        username: username, email: email, password: hashpass
    });

    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.send("Invalid email");
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.send("Invalid Password");
    }

    req.session.user = {
        username: user.username,
        email: user.email,
    };
    res.redirect('/dashboard');
})

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', {
        user: req.session.user
    });
});

app.listen(5000, () => {
    console.log("server running");
})

app.get('/rooms/add', async (req, res) => {
    try {
        const response = await fetch(
            'http://localhost/php-api/get_room_type.php'
        );

        if (!response.ok) {
            throw new Error(`PHP API returned ${response.status}`);
        }

        const roomTypes = await response.json();

        res.render('add_room', {
            roomTypes: roomTypes
        });

    } catch (err) {
        console.log('Room Type API Error:', err);
        res.status(500).send('Unable to load room types');
    }
});


app.post('/rooms/add', async (req, res) => {
    await Room.create(req.body);
    res.redirect('/rooms');
});

app.get('/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.render('display_rooms', { rooms });
})