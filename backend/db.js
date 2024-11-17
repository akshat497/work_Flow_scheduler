const mongoose = require('mongoose');
require('dotenv').config(); // To load environment variables from .env file

// MongoDB connection URL
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname'; // Default to local if no URI is provided in .env

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
     // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
