// routes/quotes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define the route to get quotes from Balampay API
router.get('/', async (req, res, next) => {
    try {
        const { base_currency, quote_currency, amount } = req.query;
        const response = await axios.get('https://api.balampay.com/sandbox/quotes', {
            headers: {
                'accept': 'application/json',
                'x-api-key': process.env.BALAM_API_KEY
            },
            params: {
                base_currency,
                quote_currency,
                amount
            }
        });
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Custom error handler
router.use((error, req, res, next) => {
    res.status(error.response ? error.response.status : 500).json({
        message: 'Failed to retrieve quotes',
        error: error.message,
    });
});

module.exports = router;
