const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  console.log('Request Body:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Missing required fields');
  }

  const mailOptions = {
    from: 'your_actual_email@gmail.com',
    to: 'your_actual_email@gmail.com',
    subject: 'New Portfolio Inquiry',
    text: `
      A recruiter has inquired from your portfolio:

      Name: ${name}
      Email: ${email}
      Message: ${message}

      Please respond to this inquiry as soon possible.
    `,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_actual_email@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).send('Internal server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});