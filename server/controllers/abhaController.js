const fast2sms = require('fast-two-sms');
const otpModel = require('../models/otpModel');
const abhaModel = require('../models/abhaModel');

// Controller function to send OTP for Abha creation
const sendOTPForAbha = async (req, res) => {
    try {
        const { mobileNumber } = req.body;

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
        console.error('Error sending OTP for Abha:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP for Abha.', error: error.message });
    }
};

// Controller function to verify OTP for Abha creation
const verifyOTPForAbha = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;

        // Find the OTP document in the database
        const otpData = await otpModel.findOne({ mobileNumber, otp, used: false });

        if (otpData) {
            // Mark OTP as used
            otpData.used = true;
            await otpData.save();

            res.status(200).json({ success: true, message: 'OTP verified successfully. Proceed with Abha creation.' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }
    } catch (error) {
        console.error('Error verifying OTP for Abha:', error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP for Abha.', error: error.message });
    }
};

// Controller function to create Abha account
const createAbhaAccount = async (req, res) => {
    try {
        const { firstName, lastName, pincode, yearOfBirth, gender, mobileNumber } = req.body;

        // Check if mobile number is already registered
        const existingAbha = await abhaModel.findOne({ mobileNumber });
        if (existingAbha) {
            return res.status(400).json({ success: false, message: 'Mobile number is already registered for Abha.' });
        }

        // Create Abha account
        const newAbha = new abhaModel({
            firstName,
            lastName,
            pincode,
            yearOfBirth,
            gender,
            mobileNumber
        });
        await newAbha.save();

        res.status(200).json({ success: true, message: 'Abha account created successfully.', data: newAbha });
    } catch (error) {
        console.error('Error creating Abha account:', error);
        res.status(500).json({ success: false, message: 'Failed to create Abha account.', error: error.message });
    }
};

// Controller function to generate Abha address
const generateAbhaAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const { mobileNumber } = req.params;
        console.log(mobileNumber)

        // Find the Abha document in the database using mobile number
        const abhaData = await abhaModel.findOne({ mobileNumber });

        if (abhaData) {
            // Check if the existing Abha address already ends with '@abdm'
            if (abhaData.abhaAddress && abhaData.abhaAddress.endsWith('@abdm')) {
                res.status(200).json({ success: true, message: 'Abha address already ends with "@abdm".', data: abhaData });
            } else {
                // Add Abha address with '@abdm' suffix
                abhaData.abhaAddress = `${address}@abdm`;
                await abhaData.save();
                res.status(200).json({ success: true, message: 'Abha address generated successfully.', data: abhaData });
            }
        } else {
            res.status(404).json({ success: false, message: 'Abha account not found for the provided mobile number.' });
        }
    } catch (error) {
        console.error('Error generating Abha address:', error);
        res.status(500).json({ success: false, message: 'Failed to generate Abha address.', error: error.message });
    }
};


module.exports = {
    sendOTPForAbha,
    verifyOTPForAbha,
    createAbhaAccount,
    generateAbhaAddress
};
