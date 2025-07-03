// src/App.js

import React, { Suspense, lazy } from 'react';
import { Routes, Route }           from 'react-router-dom';
import './App.css';

const HomePage    = lazy(() => import('./pages/Home'));
const ApodPage    = lazy(() => import('./pages/Apod'));
const EpicPage    = lazy(() => import('./pages/Epic'));
const NeoPage     = lazy(() => import('./pages/Neo'));
const LibraryPage = lazy(() => import('./pages/Library'));

export default function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div className="loading">Loading…</div>}>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/apod"    element={<ApodPage />} />
          <Route path="/epic"    element={<EpicPage />} />
          <Route path="/neo"     element={<NeoPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
