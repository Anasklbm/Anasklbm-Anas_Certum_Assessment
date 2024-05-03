const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const jwtMiddleware = require('../middleware/jwtMiddleware');


// Route for signup
router.post('/sendOtp', userController.sendOTP);
router.post('/verifyOtp', userController.verifyOTP);
router.post('/signup', userController.registerUser);

//for Login
// Route to initiate login process (send OTP)
router.post('/login', userController.initiateLogin);

// Route to verify OTP and generate token
router.post('/login-verify', userController.verifyOTPAndGenerateToken);

//user Details
router.get('/user-details', jwtMiddleware, userController.getUserDetails);

module.exports = router;