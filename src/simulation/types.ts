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
  theoriticalMaxPowerDemand: string;
  actualMaxPowerDemand: string;
  concurrencyFactor: string;
  totalEnergyConsumed: string;
}

export interface SimulationOptions {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier?: number; // deafult 1
  evConsumptionKwhPer100Km: number; // default 15
  chargingPowerPerChargePointKw: number;
  numberOfIntevals: number;
  intervalDurationHours: number;
}
