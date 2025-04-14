// api/send-email.js
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

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    if (!name || !email || !message) {
        console.log('Missing fields detected.');
        return res.status(400).send('Missing required fields');
    }

    try {
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT, // Recipient email address
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = (req, res) => {
    app(req, res);
};