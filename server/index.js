// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const multer = require('multer');

const userRoutes = require('./routes/userRoutes');
const abhaRoutes = require('./routes/abhaRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


const app = express();

// Connect to MongoDB 
connectDB();

// Create a multer instance to handle multipart/form-data
const upload = multer();

// Middleware to parse multipart/form-data
app.use(upload.none());

app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON data


// Routes 
app.use('/api', userRoutes);
app.use('/api', abhaRoutes);
app.use('/api', appointmentRoutes);



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});     