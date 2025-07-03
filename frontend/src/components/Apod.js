// src/components/Apod.js

import React, { useState, useEffect } from 'react';
import './Apod.css';

export default function Apod() {
  const [date, setDate] = useState('');        // YYYY-MM-DD
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use your NASA API key from env or fallback to DEMO_KEY
  const API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
  const BASE_URL = 'https://api.nasa.gov/planetary/apod';

  const fetchApod = async selectedDate => {
    setLoading(true);
    setError(null);
    try {
      const query = [];
      query.push(`api_key=${API_KEY}`);
      if (selectedDate) query.push(`date=${selectedDate}`);
      const url = `${BASE_URL}?${query.join('&')}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setApod(data);
    } catch (err) {
      console.error('APOD fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch on mount and whenever date changes
  useEffect(() => {
    fetchApod(date);
  }, [date]);

  return (
    <div className="apod-container">
      <div className="apod-controls">
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

      {loading && <p>Loading APOD…</p>}
      {error && <p style={{ color: 'salmon' }}>Error: {error}</p>}

      {apod && !loading && !error && (
        <>
          <h2 className="apod-title">{apod.title}</h2>
          <p className="apod-date">{apod.date}</p>

          {apod.media_type === 'image' ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="apod-image"
            />
          ) : (
            <iframe
              title="APOD Video"
              src={apod.url}
              className="apod-video"
              frameBorder="0"
              allowFullScreen
            />
          )}

          <p className="apod-description">{apod.explanation}</p>
        </>
      )}
    </div>
  );
}