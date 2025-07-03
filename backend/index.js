// backend/index.js
const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routers
const apodRouter    = require('./routes/apod');
const epicRouter    = require('./routes/epic');
const neoRouter     = require('./routes/neo');
const libraryRouter = require('./routes/library');

const app = express();

// 1) CORS configuration: only allow your deployed frontend
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://cosmiqbysrushti.onrender.com';
app.use(cors({ origin: FRONTEND_URL }));

// 2) Body parsing middleware
app.use(express.json());

// 3) Health check endpoint
app.get('/', (req, res) => res.send('CosmiQ backend is live! 🚀'));

// 4) Mount API routers
app.use('/api/apod',    apodRouter);
app.use('/api/epic',    epicRouter);
app.use('/api/neo',     neoRouter);
app.use('/api/library', libraryRouter);

// 5) Catch-all 404 handler
app.use((req, res) => {
  console.warn(`⚠️  404: ${req.method} ${req.originalUrl}`);
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});

// 6) Only start the server when run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on port ${PORT}`);
  });
}

// 7) Export for serverless platforms or tests
module.exports = app;