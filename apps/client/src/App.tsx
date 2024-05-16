import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Simulation from './components/Simulation';
import { getSimulation } from './api/simulationApi';
import { SimulationResult } from 'types/types';

function App() {
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSimulation();
      if (data) {
        setSimulation(data); // Assuming the API returns an array of simulations
      }
    } catch (err) {
      setError('Failed to fetch simulation data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>App is here!!!!!!!!</h1>
      <button onClick={handleFetchSimulation} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Simulation'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Simulation simulation={simulation} />
    </div>
  );
}

export default App;