const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  console.log('Request Body:', req.body); // Debugging: Log the request body

  const { name, email, message } = req.body;

  // Format the email content
  const mailOptions = {
    from: 'your_actual_email@gmail.com', // Replace with your actual email
    to: 'your_actual_email@gmail.com',   // Replace with your actual email
    subject: 'New Portfolio Inquiry',
    text: `
      A recruiter has inquired from your portfolio:

      Name: ${name}
      Email: ${email}
      Message: ${message}

      Please respond to this inquiry as soon as possible.
    `
  };

  // Nodemailer code
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_actual_email@gmail.com', // Replace with your actual email
      pass: process.env.EMAIL_PASS // Use your Gmail App Password from Railway.app env vars
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Improved error logging
      console.error(error.stack); // Log the stack trace
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});