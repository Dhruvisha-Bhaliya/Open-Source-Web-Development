const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const Owner = require('./models/owner');
const Product = require('./models/product');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/inventorydb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'inventory_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

function isLoggedIn(req, res, next) {
    if (req.session.owner) {
        return next();
    }

    res.redirect('/login');
}

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register', {
        error: null
    });
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.render('register', {
                error: 'All fields are required'
            });
        }

        const exists = await Owner.findOne({
            email: email.toLowerCase()
        });

        if (exists) {
            return res.render('register', {
                error: 'Email already registered'
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        await Owner.create({
            name,
            email: email.toLowerCase(),
            password: hashed
        });

        res.redirect('/login?registered=1');

    } catch (err) {
        res.render('register', {
            error: 'Registration failed'
        });
    }
});

app.get('/login', (req, res) => {
    res.render('login', {
        error: null,
        success: req.query.registered
            ? 'Registration successful. Please login.'
            : null
    });
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const owner = await Owner.findOne({
            email: (email || '').toLowerCase()
        });

        if (!owner || !(await bcrypt.compare(password || '', owner.password))) {
            return res.render('login', {
                error: 'Invalid email or password',
                success: null
            });
        }
        req.session.owner = {
            id: owner._id,
            name: owner.name,
            email: owner.email
        };
        res.redirect('/dashboard');

    } catch (err) {
        res.render('login', {
            error: 'Login failed',
            success: null
        });
    }
});

app.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const products = await Product.find();

        res.render('dashboard', {
            owner: req.session.owner,
            products
        });

    } catch (err) {
        res.send('Error loading dashboard');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        if (!name || price === undefined || quantity === undefined) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (price < 0 || quantity < 0) {
            return res.status(400).json({
                message: 'Price and quantity cannot be negative'
            });
        }

        const product = await Product.create({
            name,
            price,
            quantity
        });

        res.json({
            message: 'Product saved',
            data: product
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();

        res.json({
            data: products
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});