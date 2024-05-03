const express = require('express');
const router = express.Router();
const abhaController = require('../controllers/abhaController');

// Route to send OTP for Abha creation
router.post('/abha-sendotp', abhaController.sendOTPForAbha);

// Route to verify OTP for Abha creation
router.post('/abha-verifyotp', abhaController.verifyOTPForAbha);

// Route to create Abha account
router.post('/abha', abhaController.createAbhaAccount);

// Route to generate Abha address
router.post('/abha/:mobileNumber/generateaddress', abhaController.generateAbhaAddress);

module.exports = router;
