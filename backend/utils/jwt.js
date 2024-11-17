const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken =async (userId) => {
    try {
        const secretKey = process.env.JWT_SECRET || 'your-secret-key';
        // Sign the JWT token with user ID as the payload
        return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
      } catch (error) {
        console.error('Error generating token:', error);
        return null;
      }
  };
  exports.verifyToken =async (token) => {
  const secretKey = process.env.JWT_SECRET;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


