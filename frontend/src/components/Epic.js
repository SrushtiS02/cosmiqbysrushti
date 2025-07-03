// src/components/Epic.js

import React, { useState, useEffect } from 'react';
import './Epic.css';

export default function Epic() {
  const [date, setDate]       = useState('');
  const [image, setImage]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // NASA EPIC API and archive URLs
  const API_KEY      = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
  const EPIC_API_URL = 'https://api.nasa.gov/EPIC/api/natural/date';
  const ARCHIVE_URL  = 'https://api.nasa.gov/EPIC/archive/natural';

  const fetchEpic = async selectedDate => {
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      // Build the EPIC metadata endpoint
      const datePath = selectedDate || new Date().toISOString().split('T')[0];
      const metaUrl  = `${EPIC_API_URL}/${datePath}?api_key=${API_KEY}`;

      const res = await fetch(metaUrl);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      if (data.length === 0) {
        throw new Error('No images found for that date.');
      }

      // Use the first image
      const item = data[0];
      const [yyyy, mm, dd] = item.date.split(' ')[0].split('-');
      // Construct the image URL (PNG)
      const imageUrl = `${ARCHIVE_URL}/${yyyy}/${mm}/${dd}/png/${item.image}.png?api_key=${API_KEY}`;

      setImage({
        date: item.date.split(' ')[0],
        caption: item.caption,
        imageUrl,
      });
    } catch (err) {
      console.error('EPIC fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpic(date);
  }, [date]);

  return (
    <div className="epic-container">
      <div className="epic-controls">
        <label>
          Pick a date:&nbsp;
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>

      {loading && <p>Loading EPIC…</p>}
      {error   && <p style={{ color: 'salmon' }}>Error: {error}</p>}

      {image && !loading && !error && (
        <>
          <h2 className="epic-title">DSCOVR EPIC – {image.date}</h2>
          <img
            src={image.imageUrl}
            alt={image.caption}
            className="epic-image"
          />
          <p className="epic-caption">{image.caption}</p>
        </>
      )}
    </div>
  );
}