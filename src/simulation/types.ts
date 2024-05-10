export interface IChargePoint {
  occupied: boolean;
  energyNeeded: number;
}

export enum IMeasurementUnit {
  KW = 'KW',
  KWH = 'KWH',
  PERCENT = '%',
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
  actualMaxPowerDemand: number;
  concurrencyFactor: number;
  totalEnergyConsumed: number;
}
