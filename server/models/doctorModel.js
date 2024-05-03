const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true }
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;
