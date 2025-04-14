// api/send-email.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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
        res.send('Email functionality temporarily disabled.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = app;