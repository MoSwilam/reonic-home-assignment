import React, { useState } from 'react';
import { createSimulation } from '../api/simulationApi'; // Ensure this import matches your actual file structure
import { SimulationInputDto, SimulationResult } from 'types/types';


const MockSimulationWithCustomParams = () => {
  const [params, setParams] = useState<SimulationInputDto>({
    numberOfChargePoints: '',
    arrivalProbabilityMultiplier:'',
    evConsumptionKwhPer100Km: '',
    chargingPowerPerChargePointKw: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prevParams => ({
      ...prevParams,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createSimulation(params);
      setSimulationResult(result);
    } catch (err) {
      setError('Failed to run simulation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Mock Simulation With Custom Params</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Charge Points:
            <input
              type="number"
              name="numberOfChargePoints"
              placeholder='10'
              value={params.numberOfChargePoints}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Arrival Probability Multiplier:
            <input
              type="number"
              name="arrivalProbabilityMultiplier"
              placeholder='90'
              value={params.arrivalProbabilityMultiplier}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            EV Consumption (kWh per 100 Km):
            <input
              type="number"
              name="evConsumptionKwhPer100Km"
              placeholder='10'
              value={params.evConsumptionKwhPer100Km}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Charging Power per Charge Point (kW):
            <input
              type="number"
              name="chargingPowerPerChargePointKw"
              placeholder='14'
              value={params.chargingPowerPerChargePointKw}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Running...' : 'Run'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {simulationResult && (
        <div>
          <h2>Simulation Result</h2>
          <p><strong>Theoretical Max Power Demand:</strong> {simulationResult.theoriticalMaxPowerDemand} kWh</p>
          <p><strong>Actual Max Power Demand:</strong> {simulationResult.actualMaxPowerDemand} kWh</p>
          <p><strong>Total Energy Consumed:</strong> {simulationResult.totalEnergyConsumed} kW</p>
          <p><strong>Concurrency Factor:</strong> {simulationResult.concurrencyFactor} %</p>
        </div>
      )}
    </div>
  );
};

export default MockSimulationWithCustomParams;