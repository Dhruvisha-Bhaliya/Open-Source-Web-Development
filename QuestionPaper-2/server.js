const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const Employee = require('./models/Employee');
const Vehicle = require('./models/Vehicle');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/question2db')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Error: ", err))

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'emp123',
    resave: false,
    saveUninitialized: false,
}));

function isLoggedIn(req, res, next) {
    if (req.session.employee)
        return next();
    res.redirect('/login');
}

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { name, email, password, department } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await Employee.create({
        name: name,
        email: email,
        password: hash,
        department: department
    });

    res.redirect('/login');
})

app.get("/login", (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email: email });

    if (!employee) {
        return res.send("Invalid email");
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
        return res.send("Invalid Password");
    }

    req.session.employee = {
        name: employee.name,
        email: employee.email,
        department: employee.department
    };

    res.redirect('/dashboard');
})

app.listen(5000, () => {
    console.log("Server running");
})

app.get('/dashboard', isLoggedIn, async (req, res) => {

    const vehicles = await Vehicle.find();
    res.render('dashboard', {
        employee: req.session.employee, // mush match with middleware that is function isLoggegIn
        vehicles: vehicles
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.post('/api/employees', async (req, res) => {
    const { name, email, password, department } = req.body;

    const employee = await Employee.create({
        name: name,
        email: email,
        password: password,
        department: department
    });

    res.json({
        message: 'Employee Saved',
        data: employee
    });
});

app.get('/api/employees', async (req, res) => {
    const employee = await Employee.find();
    res.json(employee);
})

app.put('/api/employees/:id', async (req, res) => {
    const { name, email, department } = req.body;

    const employee = await Employee.findByIdAndUpdate(
        req.params.id, {
        name: name,
        email: email,
        department: department
    },
        { new: true }
    );

    res.json({
        message: "Employee Updated",
        data: employee
    })
})

app.delete('/api/employees/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({
        message: "Employee Deleted"
    });
});

app.post('/api/vehicles', async (req, res) => {
    const {
        vehicleName,
        vehicleType,
        price
    } = req.body;
    const vehicle = await Vehicle.create({
        vehicleName: vehicleName,
        vehicleType: vehicleType,
        price: price
    });
    res.json({
        message: 'Vehicle Saved',
        data: vehicle
    });
});

app.get('/api/vehicles', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
});
