// routes/emailRoutes.js
const express = require('express');
const { scheduleEmailSequence } = require('../controllers/emailController');
const { createUser ,loginUser} = require('../controllers/auth');
const authenticate = require('../middleware/auth');

const router = express.Router();

// POST endpoint for scheduling an email
router.post('/schedule-email', authenticate, scheduleEmailSequence);
router.post('/signup', createUser);
router.post('/login', loginUser);
module.exports = router;
