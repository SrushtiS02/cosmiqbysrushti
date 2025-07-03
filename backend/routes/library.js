// backend/routes/library.js
const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
if (!NASA_API_KEY) {
  console.error('⚠️ Missing NASA_API_KEY in backend/.env (only needed for other endpoints)');
}

// GET /api/library?q=searchTerm
router.get('/', async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter `q`' });
  }

  try {
    // Note: No api_key here—this endpoint is open!
    const { data } = await axios.get('https://images-api.nasa.gov/search', {
      params: { q, media_type: 'image' }
    });

    // Grab up to 30 items
    const items = (data.collection?.items || []).slice(0, 30);
    return res.json(items);

  } catch (err) {
    console.error('🚨 Library fetch error:', err.response?.status, err.message);
    const status  = err.response?.status || 500;
    const message = err.response?.data?.error || 'Failed to fetch library';
    return res.status(status).json({ error: message });
  }
});

module.exports = router;
