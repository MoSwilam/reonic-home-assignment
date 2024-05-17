import React, { useState } from 'react';
import { getSimulation } from '../api/simulationApi';
import { SimulationResult } from '../types/types';
import { SimulationInputDto } from '@app/common';

const MockSimulation = () => {
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: SimulationResult = await getSimulation();
      if (data) {
        setSimulation(data);
      } else {
        setError('Failed to fetch simulation data');
      }
    } catch (err) {
      setError('Failed to fetch simulation data');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h1>Mock Simulation with Default params</h1>

      <p>
        Default Parameters:
        <ul>
          <li>Number of Charge Points: 20</li>
          <li>Charging Power per Charge Point: 11kW</li>
          <li>Simulation Duration: 1 year (365 days / 35040 ticks)</li>
        </ul>
      </p>

      <button onClick={handleFetchSimulation} disabled={loading}>
        {loading ? 'Loading...' : 'Run'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {simulation ? (
        <div>
          <h2>Simulation Result</h2>
          <p><strong>Theoretical Maximum Power Demand:</strong> {simulation.theoriticalMaxPowerDemand} kWh</p>
          <p><strong>Actual Max Power Demand:</strong> {simulation.actualMaxPowerDemand} kWh</p>
          <p><strong>Total Energy Consumed:</strong> {simulation.totalEnergyConsumed} kW</p>
          <p><strong>Concurrency Factor:</strong> {simulation.concurrencyFactor} %</p>
        </div>
      ) : (<></>)}
    </div>
  );
};

export default MockSimulation;