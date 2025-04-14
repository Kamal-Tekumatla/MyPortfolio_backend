// api/send-email.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log('Attempting to send simplified Nodemailer email...');

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
                subject: 'Simplified Nodemailer Test',
                text: 'This is a test email from Nodemailer.',
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            res.send('Simplified Nodemailer email test successful.');
        } catch (error) {
            console.error('Error sending simplified Nodemailer email:', error);
            res.status(500).send('Error sending simplified Nodemailer email.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};