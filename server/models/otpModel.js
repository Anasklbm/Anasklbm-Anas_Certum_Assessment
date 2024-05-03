const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP expires in 5 minutes (300 seconds)
  },
  used: {
    type: Boolean,
    default: false
  }
});

const otpModel = mongoose.model('OTP', otpSchema);

module.exports = otpModel;
