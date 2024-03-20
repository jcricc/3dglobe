import React from 'react';
import './App.css';
import Header from './Header';
import GlobeAnimation from './GlobeAnimation';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="hero-section">
        <GlobeAnimation />
      </div>
    </div>
  );
}

export default App;


