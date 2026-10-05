const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({

    vehicleName: {
        type: String
    },

    vehicleType: {
        type: String
    },

    price: {
        type: Number
    }

});

module.exports = mongoose.model('Vehicle', VehicleSchema);