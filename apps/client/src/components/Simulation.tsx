import React from 'react';
import { SimulationResult } from 'types/types';

interface SimulationProps {
  simulation: SimulationResult | null;
}

const Simulation: React.FC<SimulationProps> = ({ simulation }) => {
  if (!simulation) return <p>No simulation data available.</p>;

  const { theoriticalMaxPowerDemand, actualMaxPowerDemand, totalEnergyConsumed, concurrencyFactor } = simulation;

  return (
    <div>
      <h2>Simulation Result</h2>
      <p><strong>Theoretical Max Power Demand:</strong> {theoriticalMaxPowerDemand} kWh</p>
      <p><strong>Actual Max Power Demand:</strong> {actualMaxPowerDemand} kWh</p>
      <p><strong>Total Energy Consumed:</strong> {totalEnergyConsumed} kw</p>
      <p><strong>Concurrency Factor:</strong> {concurrencyFactor} %</p>
    </div>
  );
};

export default Simulation;