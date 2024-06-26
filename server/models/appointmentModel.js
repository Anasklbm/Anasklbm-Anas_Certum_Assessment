const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  doctorId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
