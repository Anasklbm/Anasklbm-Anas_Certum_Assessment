const Appointment = require('../models/appointmentModel');

// Controller function to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    // Create appointment
    const newAppointment = new Appointment({
      userId,
      doctorId,
      date,
      time
    });
    await newAppointment.save();

    res.status(200).json({ success: true, message: 'Appointment created successfully.', data: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, message: 'Failed to create appointment.', error: error.message });
  }
};

// Controller function to get all appointments for a user
const getAppointmentsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)

    // Find appointments for the user
    const appointments = await Appointment.find({ userId });
    console.log(appointments)

    res.status(200).json({ success: true, message: 'Appointments retrieved successfully.', data: appointments });
  } catch (error) {
    console.error('Error getting appointments for user:', error);
    res.status(500).json({ success: false, message: 'Failed to get appointments for user.', error: error.message });
  }
};

// Controller function to get all doctors with appointments
const getAllDoctorsWithAppointments = async (req, res) => {
  try {
    // Find all appointments and populate the doctor details
    const appointments = await Appointment.find().populate('doctorId');

    res.status(200).json({ success: true, message: 'Doctors with appointments retrieved successfully.', data: appointments });
  } catch (error) {
    console.error('Error getting doctors with appointments:', error);
    res.status(500).json({ success: false, message: 'Failed to get doctors with appointments.', error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsForUser,
  getAllDoctorsWithAppointments
};
