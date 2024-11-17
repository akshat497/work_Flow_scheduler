const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that the email is unique
    trim: true,   // Remove leading/trailing whitespace
    lowercase: true, // Convert email to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforce minimum length for passwords
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Roles: user or admin
    default: 'user', // Default role is 'user'
  },
  profilePicture: {
    type: String, // URL to the profile picture
    default: '', // Default empty string if no picture is uploaded
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the updated date
  },
});

// Middleware to hash the password before saving the user


// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
