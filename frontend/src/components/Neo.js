// src/components/Neo.js

import React, { useEffect, useState } from 'react';
import './Neo.css';

export default function Neo() {
  const [neos, setNeos]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // NASA NEO Feed endpoint for today's asteroids
  const API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
  const today   = new Date().toISOString().split('T')[0];
  const FEED_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;

  useEffect(() => {
    fetch(FEED_URL)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        const todaysNeos = data.near_earth_objects[today] || [];
        setNeos(todaysNeos);
      })
      .catch(err => {
        console.error('NEO fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Near-Earth Objects…</div>;
  if (error)   return <div style={{ color: 'salmon' }}>Error: {error}</div>;
  if (!neos.length) return <div>No near-Earth objects for today.</div>;

  return (
    <div className="neo-container">
      <h2 className="neo-title">
        Near-Earth Objects for {new Date().toLocaleDateString()}
      </h2>
      <div className="neo-grid">
        {neos.map(neo => {
          const { meters: dia } = neo.estimated_diameter;
          const approach = neo.close_approach_data[0];
          return (
            <div key={neo.id} className="neo-item">
              <h3 className="neo-name">{neo.name}</h3>
              <p className="neo-size">
                Diameter: {dia.estimated_diameter_min.toFixed(1)}m –{' '}
                {dia.estimated_diameter_max.toFixed(1)}m
              </p>
              <p className="neo-date">
                Approach: {approach.close_approach_date} @{' '}
                {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h
              </p>
              <p className={`neo-hazard ${neo.is_potentially_hazardous_asteroid ? 'hazard' : ''}`}>
                {neo.is_potentially_hazardous_asteroid
                  ? '⚠️ Potentially Hazardous'
                  : 'Safe'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
