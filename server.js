const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const nodemailer = require('nodemailer'); // Commented out

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

  // const mailOptions = { ... }; // Commented out
  // const transporter = nodemailer.createTransport({ ... }); // Commented out

  try {
    // const info = await transporter.sendMail(mailOptions); // Commented out
    // console.log('Email sent: ' + info.response); // Commented out
    res.send('Email functionality temporarily disabled.'); // Replace with a test message
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