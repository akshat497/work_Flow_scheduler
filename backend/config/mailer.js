const nodemailer = require('nodemailer');

// Create a transporter object using default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secure: true,
    port: 465, // you can use other email services too
  auth: {
    user: process.env.EMAIL_USER,  // Your email
    pass: process.env.EMAIL_PASS   // Your email password or app password
  }
});

// Send email function
const sendEmail = (to, subject, body, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to,                          // recipient(s)
    subject,                     // subject line
    text:body,                       // plain text body
    html                         // HTML body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
