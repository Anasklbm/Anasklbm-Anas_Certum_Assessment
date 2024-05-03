const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// Route to get all appointments for a user
router.get('/users/:userId/appointments', appointmentController.getAppointmentsForUser);

// Route to get all doctors with appointments
router.get('/doctors/appointments', appointmentController.getAllDoctorsWithAppointments);

module.exports = router;