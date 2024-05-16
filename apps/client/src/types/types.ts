// Define the simulation result type
export interface SimulationResult {
  theoriticalMaxPowerDemand: number;
  actualMaxPowerDemand: number;
  totalEnergyConsumed: number;
  concurrencyFactor: number;
}
