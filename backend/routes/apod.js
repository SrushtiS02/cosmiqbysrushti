// backend/routes/apod.js

const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
if (!NASA_API_KEY) {
  console.error('⚠️ Missing NASA_API_KEY in backend/.env');
}

// Simple in-memory cache with 10-minute TTL
const cache = {};
const TTL = 1000 * 60 * 10; // 10 minutes

// GET /api/apod?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  if (!NASA_API_KEY) {
    return res
      .status(500)
      .json({ error: 'Server not configured with NASA_API_KEY' });
  }

  const date = req.query.date || 'latest';
  const now = Date.now();

  // Serve from cache if still valid
  if (cache[date] && (now - cache[date].timestamp) < TTL) {
    return res.json(cache[date].data);
  }

  try {
    const params = { api_key: NASA_API_KEY };
    if (req.query.date) params.date = req.query.date;

    const { data } = await axios.get(
      'https://api.nasa.gov/planetary/apod',
      { params }
    );

    // Cache the fresh result
    cache[date] = { timestamp: now, data };
    return res.json(data);

  } catch (err) {
    console.error(
      '🚨 APOD fetch error:',
      err.response?.status,
      err.response?.data || err.message
    );
    const status = err.response?.status || 500;
    const msg =
      err.response?.data?.error?.message ||
      err.response?.data?.msg ||
      'Failed to fetch APOD';
    return res.status(status).json({ error: msg });
  }
});

module.exports = router;
