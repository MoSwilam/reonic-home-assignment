export interface ISimulationResult {
  theoriticalMaxPowerDemand: IMeasurement;
  actualMaxDemand: IMeasurement;
  averagePowerDemand: IMeasurement;
  concurrencyFactor: IMeasurement;
}

export interface IMeasurement {
  value: number;
  unit: string;
}
