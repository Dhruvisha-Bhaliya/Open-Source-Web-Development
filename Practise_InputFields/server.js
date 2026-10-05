const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Booking = require('./models/Booking');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/inputfielddb')
    .then(() => console.log("Connected")).catch((err) => ("Error", err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

function isLoggedIn(req, res, next) {
    if (req.session.booking)
        return next();
    res.redirect('/login');
}

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {

    const {
        guestName,
        email,
        password,
        roomType,
        gender,
        facilities,
        checkIn,
        checkOut
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await Booking.create({
        guestName: guestName,
        email: email,
        password: hash,
        roomType: roomType,
        gender: gender,
        facilities: facilities,
        checkIn: checkIn,
        checkOut: checkOut
    });

    res.redirect('/login');
})

// ================= LOGIN =================

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const booking = await Booking.findOne({
        email: email
    });

    if (!booking) {
        return res.send("Invalid email");
    }

    const match = await bcrypt.compare(
        password,
        booking.password
    );

    if (!match) {
        return res.send("Invalid Password");
    }

    req.session.booking = {
        guestName: booking.guestName,
        email: booking.email,
        roomType: booking.roomType,
        gender: booking.gender,
        facilities: booking.facilities,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
    };

    res.redirect('/dashboard');
});


// app.get("/dashboard", (req, res) => {

//     if (!req.session.booking) {
//         return res.redirect("/login");
//     }

//     res.render("dashboard", {
//         booking: req.session.booking
//     });

// });

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy();

    res.redirect("/login");

});

// ==================================================
//                    REST APIs
// ==================================================

// ================= POST API =================

app.post('/api/bookings', async (req, res) => {

    const {
        guestName,
        email,
        password,
        roomType,
        gender,
        facilities,
        checkIn,
        checkOut
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const booking = await Booking.create({

        guestName: guestName,
        email: email,
        password: hash,
        roomType: roomType,
        gender: gender,
        facilities: facilities,
        checkIn: checkIn,
        checkOut: checkOut

    });

    res.json({
        message: 'Booking Saved',
        data: booking
    });

});

// ================= GET API =================

app.get('/api/bookings', async (req, res) => {

    const bookings = await Booking.find();

    res.json(bookings);

});

// ================= PUT API =================

app.put('/api/bookings/:id', async (req, res) => {

    const {
        guestName,
        email,
        roomType,
        gender,
        facilities,
        checkIn,
        checkOut
    } = req.body;

    const booking = await Booking.findByIdAndUpdate(

        req.params.id,

        {
            guestName: guestName,
            email: email,
            roomType: roomType,
            gender: gender,
            facilities: facilities,
            checkIn: checkIn,
            checkOut: checkOut
        },

        { new: true }

    );

    res.json({

        message: "Booking Updated",

        data: booking

    });

});

// ================= DELETE API =================

app.delete('/api/bookings/:id', async (req, res) => {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({

        message: "Booking Deleted"

    });

});


app.listen(7000, () => {
    console.log("Server running 700");
});

app.get('/dashboard', async (req, res) => {

    const roomType = req.query.roomType;
    const facilities = req.query.facilities;

    let query = {};

    // Dropdown filter
    if (roomType) {
        query.roomType = roomType;
    }

    // Checkbox filter
    if (facilities) {

        if (Array.isArray(facilities)) {
            query.facilities = { $all: facilities };
        } else {
            query.facilities = facilities;
        }

    }

    const bookings = await Booking.find(query);

    res.render('dashboard', {
        bookings: bookings,
        roomType: roomType,
        facilities: facilities
    });

});