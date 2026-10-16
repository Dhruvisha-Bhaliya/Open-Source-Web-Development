const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNo: { type: String, required: true },
    roomType: { type: String, required: true },
    roomPrice: { type: Number, required: true },
    floorNo: { type: Number, required: true },
    roomStatus: { type: String, required: true }
});

module.exports = mongoose.model('Room', roomSchema);