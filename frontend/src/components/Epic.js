// src/components/Epic.js

import React, { useState, useEffect } from 'react';
import './Epic.css';

export default function Epic() {
  const [date, setDate]     = useState('');
  const [image, setImage]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchEpic = async selectedDate => {
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const query = selectedDate ? `?date=${selectedDate}` : '';
      const res = await fetch(`/api/epic${query}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      // take only the first item
      if (data.length > 0) setImage(data[0]);
      else setError('No images found for that date.');
    } catch (err) {
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
          <h2 className="epic-title">
            DSCOVR EPIC – {image.date.split(' ')[0]}
          </h2>
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
