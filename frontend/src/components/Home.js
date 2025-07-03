// src/components/Home.js
import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../animations/cosmiqOrbit.json';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [quote, setQuote] = useState('Explore the universe through data');

  const handleHover = (text) => {
    setQuote(text);
  };

  const handleLeave = () => {
    setQuote('Explore the universe through data');
  };

  return (
    <div className="home-container">
      {/* Background orbiting animation */}
      <div className="background-animation">
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      <h1 className="title">CosmiQ</h1>
      <p className="subtitle">{quote}</p>

      <div className="button-group">
        <Link
          to="/apod"
          className="nav-button"
          onMouseEnter={() => handleHover("NASA's Astronomy Picture of the Day")}
          onMouseLeave={handleLeave}
        >
          APOD
        </Link>
        <Link
          to="/epic"
          className="nav-button"
          onMouseEnter={() => handleHover('Daily Earth images from DSCOVR')}
          onMouseLeave={handleLeave}
        >
          EPIC
        </Link>
        <Link
          to="/neo"
          className="nav-button"
          onMouseEnter={() => handleHover('Track Near-Earth Objects')}
          onMouseLeave={handleLeave}
        >
          NeoWs
        </Link>
        <Link
          to="/library"
          className="nav-button"
          onMouseEnter={() => handleHover('Browse space-related media')}
          onMouseLeave={handleLeave}
        >
          Library
        </Link>
      </div>
    </div>
  );
}

export default Home;
