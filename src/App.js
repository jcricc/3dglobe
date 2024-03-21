import React from 'react';
import './App.css';
import Header from './Header'; // Import the Header component
import GlobeAnimation from './GlobeAnimation'; // Import the GlobeAnimation component

function App() {
  return (
    <div className="App">
      <Header /> {/* This will display the header */}
      <main className="Hero">
        <GlobeAnimation /> {/* This will display the globe animation in the hero space */}
      </main>
    </div>
  );
}

export default App;



