// config/agenda.js
const Agenda = require('agenda');
const nodemailer = require('nodemailer');
require('dotenv').config();

const mongoConnectionString = process.env.MONGO_URI;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

// Define the email sending job
agenda.define('sendEmail', async (job) => {
  const { to, subject, body } = job.attrs.data;

  const mailOptions = {
    from: process.env.MAILER_USER,
    to,
    subject,
    text:body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

module.exports = agenda;
