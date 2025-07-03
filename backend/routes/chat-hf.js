// backend/routes/chat-hf.js
const express = require('express');
const fetch   = require('node-fetch');  // v2 import style
const router  = express.Router();

// POST /api/chat  { message: string }
router.post('/', async (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Missing message in body' });
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: message })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error || 'HF error' });
    }

    const data = await response.json();
    const reply = Array.isArray(data) ? data[0]?.generated_text : '';
    return res.json({ reply });
  } catch (err) {
    console.error('🔴 HF Inference error:', err);
    return res.status(500).json({ error: 'Inference failed' });
  }
});

module.exports = router;
