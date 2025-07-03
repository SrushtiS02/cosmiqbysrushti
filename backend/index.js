// backend/index.js
const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apodRouter    = require('./routes/apod');
const epicRouter    = require('./routes/epic');
const neoRouter     = require('./routes/neo');
const libraryRouter = require('./routes/library');

const app = express();

// 1) Global middleware
app.use(cors());
app.use(express.json());

// 2) Health check
app.get('/', (req, res) => res.send('CosmiQ backend is live! 🚀'));

// 3) Mount your APIs *before* the 404 handler
app.use('/api/apod',    apodRouter);
app.use('/api/epic',    epicRouter);
app.use('/api/neo',     neoRouter);
app.use('/api/library', libraryRouter);

// 4) Catch-all 404 for anything else
app.use((req, res) => {
  console.warn(`⚠️  404: ${req.method} ${req.originalUrl}`);
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});

// 5) Only start server when this file is run directly (local dev)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on port ${PORT}`);
  });
}

// Export the app for use as a Vercel Serverless Function
module.exports = app;
