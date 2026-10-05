const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    guestName: { type: String },
    email: { type: String },
    roomType: { type: String },
    password: { type: String },
    gender: {
        type: String
    },

    facilities: {
        type: [String]
    },

    checkIn: {
        type: Date
    },

    checkOut: {
        type: Date
    }
});

module.exports = mongoose.model('Booking',BookingSchema);