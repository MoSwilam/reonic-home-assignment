// Define the simulation result type
export interface SimulationResult {
  theoriticalMaxPowerDemand: number;
  actualMaxPowerDemand: number;
  totalEnergyConsumed: number;
  concurrencyFactor: number;
}

export const apiUrl = 'http://localhost:3010/api';

export interface SimulationInputDto {
  numberOfChargePoints: number | string;
  arrivalProbabilityMultiplier: number | string;
  evConsumptionKwhPer100Km: number | string;
  chargingPowerPerChargePointKw: number | string;
}