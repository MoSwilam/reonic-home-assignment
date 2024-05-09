export interface IChargePoint {
  occupied: boolean;
  energyNeeded: number;
}

export interface IMeasurement {
  value: number;
  unit: string;
}

export enum IMeasurementUnit {
  KW = 'KW',
  KWH = 'KWH',
  PERCENT = '%',
}

export interface ISimulationResult {
  theoriticalMaxPowerDemand: IMeasurement;
  actualMaxDemand: IMeasurement;
  averagePowerDemand: IMeasurement;
  concurrencyFactor: IMeasurement;
}

export interface ITimeInterval {
  period: string;
  probability: number;
}

export interface IChargingDemand {
  probability: number;
  kmRange: number;
}

export interface SimulationResultDto {
  theoriticalMaxPowerDemand: number;
  actualMaxDemand: number;
  concurrencyFactor: number;
  totalEnergyConsumed: number;
}
