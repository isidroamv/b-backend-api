jest.mock('axios');
const request = require('supertest');
const express = require('express');
const axios = require('axios');
const quotesRouter = require('../src/routes/quotes');

// Mock the axios module
jest.mock('axios');

// Create a test server instance
const app = express();
app.use(express.json());
app.use('/api/quotes', quotesRouter);

describe('GET /api/quotes', () => {
    it('should return quotes data', async () => {
        // Mock the response from the API
        const mockData = {
            message: 'Quotation information',
            data: {
                "quote_id": "00000000-0000-0000-0000-000000000000",
                "base_currency": "USD",
                "quote_currency": "MXN",
                "base_amount": 999.0,
                "quote_amount": 19354.99,
                "rate": 20.106,
                "balam_rate": 19.403,
                "fixed_fee": 1.5,
                "pct_fee": 0.015,
                "status": "ACTIVE",
                "expiration_ts": "2024-11-04T20:32:37"
            }
        }; // Example mock response
        axios.get.mockResolvedValue({ data: mockData });

        const response = await request(app).get('/api/quotes?base_currency=USD&quote_currency=MXN&amount=999');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData); // Adjust this based on your expected output
    });

    it('should handle errors', async () => {
        // Mock an error response from the API
        axios.get.mockRejectedValue(new Error('API error'));

        const response = await request(app).get('/api/quotes?base_currency=USD&quote_currency=MXN&amount=999');
        
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to retrieve quotes');
    });
});