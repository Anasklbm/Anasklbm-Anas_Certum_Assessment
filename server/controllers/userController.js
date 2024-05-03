const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');

require('dotenv').config(); // Load environment variables from .env file

const fast2sms = require('fast-two-sms');

// Controller function to send OTP to a mobile number
const sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    // Check if mobile number is registered
    const existingUser = await userModel.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Mobile number is already registered.' });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP details to OTP model
    const otpData = new otpModel({
      mobileNumber,
      otp
    });
    await otpData.save();

    // Send OTP using Fast2SMS
    const response = await fast2sms.sendMessage({ authorization: process.env.FAST2SMS_API_KEY, message: `Your OTP is: ${otp}`, numbers: [mobileNumber] });

    if (response.status === 'OK') {
      res.status(200).json({ success: true, message: 'OTP sent successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send OTP.', error: response });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.', error: error.message });
  }
};

// Controller function to verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Find the OTP document in the database
    const otpData = await OTP.findOne({ mobileNumber, otp, used: false });

    if (otpData) {
      // Mark OTP as used
      otpData.used = true;
      await otpData.save();

      res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.', error: error.message });
  }
};


// Controller function to register a new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, dob, gender, userType, subType, province, abhaAddress, mobileNumber } = req.body;
    console.log(req.body)

    // Check if mobile number is already registered
    const existingUserMobile = await userModel.findOne({ mobileNumber });
    if (existingUserMobile) {
      return res.status(400).json({ success: false, message: 'Mobile number is already registered.' });
    }

    // Check if abha address is already registered
    const existingUserAddress = await userModel.findOne({ abhaAddress });
    if (existingUserAddress) {
      return res.status(400).json({ success: false, message: 'Abha address is already registered.' });
    }

    // Create new user
    const newUser = new userModel({
      firstName,
      lastName,
      dob,
      gender,
      userType,
      subType,
      province,
      abhaAddress,
      mobileNumber
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Failed to register user.', error: error.message });
  }
};

// Controller function to initiate login process (send OTP)
const initiateLogin = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    // Check if mobile number is registered
    const existingUser = await userModel.findOne({ mobileNumber });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'Mobile number is not registered.' });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP details to OTP model
    const otpData = new otpModel({
      mobileNumber,
      otp
    });
    await otpData.save();

    // Send OTP using Fast2SMS
    const response = await fast2sms.sendMessage({ authorization: process.env.FAST2SMS_API_KEY, message: `Your OTP is: ${otp}`, numbers: [mobileNumber] });

    if (response.status === 'OK') {
      res.status(200).json({ success: true, message: 'OTP sent successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send OTP.', error: response });
    }
  } catch (error) {
    console.error('Error initiating login:', error);
    res.status(500).json({ success: false, message: 'Failed to initiate login.', error: error.message });
  }
};

// Controller function to verify OTP and generate token
const verifyOTPAndGenerateToken = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Find the OTP document in the database
    const otpData = await otpModel.findOne({ mobileNumber, otp, used: false });

    if (otpData) {
      // Mark OTP as used
      otpData.used = true;
      await otpData.save();

      // Generate JWT token
      const token = jwt.sign({ mobileNumber: otpData.mobileNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ success: true, message: 'OTP verified successfully.', token });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  } catch (error) {
    console.error('Error verifying OTP and generating token:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP and generate token.', error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    // Get user details from the request object
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    // Fetch additional details from the database
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found in the database' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
  sendOTP, registerUser, verifyOTP, initiateLogin, verifyOTPAndGenerateToken, getUserDetails
};
