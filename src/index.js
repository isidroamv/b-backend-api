// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fakeJwtMiddleware = require('./middleware/auth');
const quotesRouter = require('./routes/quotes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fakeJwtMiddleware); // Middleware for JWT simulation

// API routes
app.use('/api/quotes', quotesRouter);

module.exports = app;

