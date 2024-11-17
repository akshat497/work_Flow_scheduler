const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch the user data from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Check if the user has the necessary authorization (optional role check)
    if (user.role !== 'user' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    // Attach the user data to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
