// api/send-email.js
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const bodyParser = require('body-parser');
            const cors = require('cors');

            cors()(req, res, async () => {
                bodyParser.urlencoded({ extended: false })(req, res, async () => {
                    bodyParser.json()(req, res, async () => {
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
                            res.send('Email functionality temporarily disabled.');
                        } catch (error) {
                            console.error('Error:', error);
                            res.status(500).send('Internal server error');
                        }
                    });
                });
            });
        } catch (err) {
            console.error('Error processing request', err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};