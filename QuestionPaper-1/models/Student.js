const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unqiue: true, lowercase: true, trim: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);