const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  age: Number,

  salary: Number,

  isActive: Boolean,

  joiningDate: Date,

  skills: [String],

  address: {
    city: String,
    state: String
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);