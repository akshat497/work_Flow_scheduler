const Agenda = require('agenda');
const { MongoClient } = require('mongodb');
const sendEmail = require('../config/mailer');

// MongoDB URI from .env file or hardcoded
const mongoURI = 'mongodb://localhost:27017/email_scheduler';

const agenda = new Agenda({
  db: { address: mongoURI, collection: 'emailJobs' }
});

// Connect to MongoDB before starting Agenda
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB successfully');
    
    // Assign the MongoClient connection to Agenda after connection is successful
    agenda.db(client.db());  // Pass the correct db instance here
    agenda.start();  // Start Agenda only after a successful connection
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Define email job
agenda.define('send scheduled email', async (job) => {
  const { to, subject, text, html } = job.attrs.data;

  try {
    // Send email using the mailer utility
    await sendEmail(to, subject, text, html);
    console.log(`Email sent to ${to} at ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Function to schedule an email
const scheduleEmail = (to, subject, text, html) => {
  const sendAt = "2024-11-12T18:33:00"; // 6:33 PM
  agenda.schedule(sendAt, 'send scheduled email', { to, subject, text, html });
  console.log(`Scheduled email to ${to} at ${sendAt}`);
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  await agenda.stop();
  console.log('Agenda stopped gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  await agenda.stop();
  console.log('Agenda stopped gracefully');
  process.exit(0);
});

module.exports = scheduleEmail;
