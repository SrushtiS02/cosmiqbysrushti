// backend/routes/neo.js

const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
if (!NASA_API_KEY) {
  console.error('⚠️  Missing NASA_API_KEY in backend/.env');
}

// GET /api/neo?date=YYYY-MM-DD  (defaults to today)
router.get('/', async (req, res) => {
  if (!NASA_API_KEY) {
    return res
      .status(500)
      .json({ error: 'Server not configured with NASA_API_KEY' });
  }

  const date = req.query.date || new Date().toISOString().split('T')[0];

  try {
    const { data } = await axios.get(
      'https://api.nasa.gov/neo/rest/v1/feed',
      {
        params: {
          start_date: date,
          end_date:   date,
          api_key:    NASA_API_KEY
        }
      }
    );
    const neos = data.near_earth_objects?.[date] || [];
    return res.json(neos);
  } catch (err) {
    console.error('🚨 NEO feed error:', err.response?.status, err.response?.data || err.message);
    const status  = err.response?.status || 500;
    const message = err.response?.data?.error_message || 'Failed to fetch NEO data';
    return res.status(status).json({ error: message });
  }
});

module.exports = router;
