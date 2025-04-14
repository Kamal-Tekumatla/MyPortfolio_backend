const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire request body

    const { name, email, message } = req.body;

    console.log('Name:', name); // Log the extracted name
    console.log('Email:', email); // Log the extracted email
    console.log('Message:', message); // Log the extracted message

    if (!name || !email || !message) {
        console.log('Missing fields detected.'); // Log when missing fields are detected
        return res.status(400).send('Missing required fields');
    }

    try {
        res.send('Email functionality temporarily disabled.');
    } catch (error) {
        console.error('Error:', error);
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