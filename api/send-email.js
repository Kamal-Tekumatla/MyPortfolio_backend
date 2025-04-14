// api/send-email.js
const nodemailer = require('nodemailer');

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('Attempting to send explicit Nodemailer email...');

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
                subject: 'Explicit Nodemailer Test',
                text: 'This is a test email from explicit Nodemailer.',
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            res.send('Explicit Nodemailer email test successful.');
        } catch (error) {
            console.error('Error sending explicit Nodemailer email:', error);
            res.status(500).send('Error sending explicit Nodemailer email.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}

module.exports = handler;