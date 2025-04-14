const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Format the email content
  const mailOptions = {
    from: 'your_email@gmail.com', // Replace with your Gmail email
    to: 'your_email@gmail.com', // Replace with your Gmail email
    subject: 'New Portfolio Inquiry',
    text: `
      A recruiter has inquired from your portfolio:

      Name: ${name}
      Email: ${email}
      Message: ${message}

      Please respond to this inquiry as soon as possible.
    `
  };

  // Nodemailer code (same as before)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com', // Replace with your Gmail email
      pass: process.env.EMAIL_PASS // Use your Gmail App Password
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
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