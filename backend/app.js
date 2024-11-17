const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection
const emailRoutes = require('./routes/emailRoutes'); // Email job routes
const agenda = require('./config/agenda'); // Agenda setup

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Use middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', emailRoutes);

// Start Agenda
(async () => {
  await agenda.start();
  console.log('Agenda started');
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
