const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const Student = require('./models/Student');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/question1db')
    .then(() => console.log('MongoDb Connected')).
    catch((err) => console.log("Error", err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'student123',
    resave: false,
    saveUninitialized: false,
    //    cookie: { maxAge: 1000 * 60 * 60 }
}));

function isLoggedIn(req, res, next) {
    if (req.session.student)
        return next();
    res.redirect('/login');
}

// app.get('/', (req, res) => res.redirect('/login'));

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await Student.create({
        name: name,
        email: email,
        password: hash
    });

    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email: email });

    if (!student) {
        return res.send("Invalid Email");
    }

    const match = await bcrypt.compare(password, student.password);

    if (!match) {
        return res.send("Invalid Password");
    }

    req.session.student = {
        id: student._id,
        name: student.name,
        email:student.email
    };

    res.redirect('/dashboard');
})

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard', {
        student: req.session.student
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post('/api/students', async (req, res) => {
    const { name, email, password } = req.body;

    const student = await Student.create({
        name: name,
        email: email,
        password: password
    });

    res.json({
        message: 'Student saved',
        data: student
    });
});

app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
})

app.listen(3000, () => {
    console.log('Server running');
})