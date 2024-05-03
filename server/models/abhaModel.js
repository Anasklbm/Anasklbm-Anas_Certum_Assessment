const mongoose = require('mongoose');

const abhaSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  yearOfBirth: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  abhaAddress: {
    type: String,
    unique: true
  },
  abhaNumber: {
    type: String,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
  }
});

const AbhaModel = mongoose.model('abhas', abhaSchema);

module.exports = AbhaModel;
