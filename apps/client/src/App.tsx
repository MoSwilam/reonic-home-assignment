import React from 'react';
import './App.css';
import MockSimulation from './components/MockSimulation';
import MockSimulationWithCustomParams from './components/MockSimulationWithCustomParams';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="left-panel">
          <MockSimulation />
        </div>
        <div className="right-panel">
          <MockSimulationWithCustomParams />
        </div>
      </div>
    </div>
  );
}

export default App;