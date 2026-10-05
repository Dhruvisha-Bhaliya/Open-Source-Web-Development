// JWT MIDDLEWARE

function verifyToken(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    try {

        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }
}


app.get('/login', (req, res) => {

    res.render('login');

});


app.post('/login', async (req, res) => {

    const {
        email,
        password
    } = req.body;


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


    // CREATE JWT TOKEN

    const token = jwt.sign(

        {
            id: booking._id,
            email: booking.email
        },

        SECRET,

        {
            expiresIn: '1h'
        }

    );


    res.json({

        message: "Login Successful",

        token: token

    });

});

// ================= PROTECTED GET API =================

app.get('/api/bookings', verifyToken, async (req, res) => {

    const bookings = await Booking.find();

    res.json(bookings);

});


// ================= POST API =================

app.post('/api/bookings', verifyToken, async (req, res) => {

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

        message: "Booking Saved",

        data: booking

    });

});


// ================= PUT API =================

app.put('/api/bookings/:id', verifyToken, async (req, res) => {

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

        {
            new: true
        }

    );


    res.json({

        message: "Booking Updated",

        data: booking

    });

});


// ================= DELETE API =================

app.delete('/api/bookings/:id', verifyToken, async (req, res) => {

    await Booking.findByIdAndDelete(req.params.id);


    res.json({

        message: "Booking Deleted"

    });

});


// ================= JWT USER API =================

app.get('/api/profile', verifyToken, async (req, res) => {

    const booking = await Booking.findById(req.user.id);

    res.json({

        message: "User Profile",

        data: booking

    });

});

