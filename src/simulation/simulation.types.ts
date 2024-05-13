import Decimal from "decimal.js";

export interface IChargePoint {
  occupied: boolean;
  energyNeeded: number | Decimal;
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

export interface SimulationOptions {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier?: number; // deafult 1
  evConsumptionKwhPer100Km: number; // default 15
  chargingPowerPerChargePointKw: number;
  numberOfIntevals: number;
  intervalDurationHours: number;
}
