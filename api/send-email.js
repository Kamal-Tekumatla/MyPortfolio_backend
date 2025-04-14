// api/send-email.js
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log('Attempting to send simplified email...');

            // Replace with your actual email and recipient
            const to = process.env.EMAIL_RECIPIENT;
            const subject = 'Simplified Test Email';
            const text = 'This is a test email from Vercel.';

            console.log(`To: ${to}, Subject: ${subject}, Text: ${text}`);

            res.send('Simplified email test successful.');
        } catch (error) {
            console.error('Error sending simplified email:', error);
            res.status(500).send('Error sending simplified email.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};