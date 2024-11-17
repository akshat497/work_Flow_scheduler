const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateToken} = require('../utils/jwt');

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'user', profilePicture = '' } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Basic validation for email and password
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      profilePicture,
    });

    // Save the user to the database
    await user.save();

    // Generate the JWT token
    const token = await generateToken(user._id);

    // Log the token to verify it is generated correctly
    console.log('Generated Token:', token);

    // Return the user and token in the response
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profilePicture: user.profilePicture,
      },
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'User creation failed' });
  }
};
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic validation for email and password
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate the JWT token
      const token = await generateToken(user._id);
  
      // Log the token to verify it is generated correctly
      console.log('Generated Token:', token);
  
      // Return the user and token in the response
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          profilePicture: user.profilePicture,
        },
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Login failed' });
    }
  };
  