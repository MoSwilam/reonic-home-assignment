import React from 'react';
import { } from '@app/common';


const Simulation: React.FC<SimulationProps> = ({ simulation }) => {
  if (!simulation) return <p>No simulation data available.</p>;

  return (
    <div>
      <h2>Simulation Result</h2>
      <p>Theoretical Max Power Demand: {simulation.theoriticalMaxPowerDemand}</p>
      <p>Actual Max Power Demand: {simulation.actualMaxPowerDemand}</p>
      <p>Total Energy Consumed: {simulation.totalEnergyConsumed}</p>
      <p>Concurrency Factor: {simulation.concurrencyFactor}</p>
    </div>
  );
};

export default Simulation;