import { useState } from 'react';
import './App.css';
import EarthSphereAR from './components/Earth Sphere AR/EarthSphereAR';
import EarthSphere from './components/Earth Sphere/EarthSphere';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isInARMode, setIsARMode] = useState(false);

  return (
    <div className="app">
      <Navbar setIsARMode={setIsARMode} isInARMode={isInARMode} />
      {
        isInARMode ?
          <EarthSphereAR />
          :
          <EarthSphere />

      }
    </div>
  );
}

export default App;
