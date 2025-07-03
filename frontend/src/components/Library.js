// frontend/src/components/Library.js
import React, { useState } from 'react';
import './Library.css';

export default function Library() {
  const [query, setQuery]   = useState('');
  const [items, setItems]   = useState([]);
  const [loading, setLoad]  = useState(false);
  const [error, setError]   = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoad(true);
    setError(null);
    try {
      const res = await fetch(`/api/library?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="library-container">
      <h2 className="library-title">NASA Image Library</h2>

      <form className="library-form" onSubmit={handleSearch}>
        <input
          className="library-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button className="library-button" type="submit">
          Search
        </button>
      </form>

      {loading && <div className="library-loading">Loading…</div>}
      {error   && <div className="library-error">Error: {error}</div>}

      <div className="library-grid">
        {items.map((item, i) => {
          const data = item.data?.[0] || {};
          const link = item.links?.[0]?.href;
          return (
            <div key={i} className="library-item">
              {link && (
                <img
                  src={link}
                  alt={data.title}
                  className="library-image"
                />
              )}
              <h3 className="library-item-title">{data.title}</h3>
              <p className="library-item-date">
                {data.date_created?.slice(0, 10)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
