const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  subType: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  abhaAddress: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
