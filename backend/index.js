// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apodRouter    = require('./routes/apod');
const epicRouter    = require('./routes/epic');
const neoRouter     = require('./routes/neo');
const libraryRouter = require('./routes/library');

const app = express();
const PORT = process.env.PORT || 5000;

// 1) global middleware
app.use(cors());
app.use(express.json());

// 2) health check
app.get('/', (req, res) => res.send('CosmiQ backend is live! 🚀'));

// 3) mount your APIs *before* the 404 logger
app.use('/api/apod',    apodRouter);
app.use('/api/epic',    epicRouter);
app.use('/api/neo',     neoRouter);
app.use('/api/library', libraryRouter);

// 4) catch-all 404 for anything else
app.use((req, res) => {
  console.log(`⚠️  404: ${req.method} ${req.originalUrl}`);
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
