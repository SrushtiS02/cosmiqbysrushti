// backend/routes/epic.js
const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;
if (!NASA_API_KEY) {
  console.error('⚠️ Missing NASA_API_KEY in backend/.env');
}

// GET /api/epic?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  if (!NASA_API_KEY) {
    return res.status(500).json({ error: 'Server missing NASA_API_KEY' });
  }

  const requested = req.query.date;                // e.g. "2025-07-02"
  const today     = new Date().toISOString().split('T')[0];

  try {
    let data;
    // if no date or date === today, use the default endpoint
    if (!requested || requested === today) {
      const resp = await axios.get(
        'https://api.nasa.gov/EPIC/api/natural',
        { params: { api_key: NASA_API_KEY } }
      );
      data = resp.data;
    } else {
      // archived date endpoint
      const resp = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${requested}`,
        { params: { api_key: NASA_API_KEY } }
      );
      data = resp.data;
    }

    // map metadata to include full imageUrl
    const items = (data || []).map(item => {
      const d = item.date.split(' ')[0].replace(/-/g, '/'); // "YYYY/MM/DD"
      return {
        ...item,
        imageUrl: `https://api.nasa.gov/EPIC/archive/natural/${d}/png/${item.image}.png?api_key=${NASA_API_KEY}`
      };
    });

    return res.json(items);
  } catch (err) {
    console.error('🚨 EPIC fetch error:', err.response?.status, err.message);
    return res
      .status(err.response?.status || 500)
      .json({ error: 'Failed to fetch EPIC data' });
  }
});

module.exports = router;
