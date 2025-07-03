// backend/index.js

// 1) Load environment variables
require('dotenv').config();

const express = require('express');
const cors    = require('cors');

// 2) Import your routers
const apodRouter    = require('./routes/apod');
const epicRouter    = require('./routes/epic');
const neoRouter     = require('./routes/neo');
const libraryRouter = require('./routes/library');
const chatHFRouter  = require('./routes/chat-hf');

const app  = express();
const PORT = process.env.PORT || 5000;

// 3) Global middleware
app.use(cors());
app.use(express.json());

// 4) Health‐check
app.get('/', (req, res) => {
  res.send('🚀 CosmiQ Backend API is live!');
});

// 5) Mount API routes
app.use('/api/apod',    apodRouter);
app.use('/api/epic',    epicRouter);
app.use('/api/neo',     neoRouter);
app.use('/api/library', libraryRouter);
app.use('/api/chat',    chatHFRouter);

// 6) 404 logger for unmatched requests
app.use((req, res) => {
  console.log(`⚠️  404 hit: ${req.method} ${req.originalUrl}`);
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});

// 7) Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
