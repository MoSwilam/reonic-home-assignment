import { AbstractDocument } from '@reonic/common';
import {
  PartialType,
} from '@nestjs/swagger';
import {
  IsNumber,
} from 'class-validator';

export class SimulationInputDto extends AbstractDocument {
  @IsNumber()
  numberOfChargePoints: number;

  @IsNumber()
  arrivalProbabilityMultiplier: number;

  @IsNumber()
  evConsumptionKwhPer100Km: number;

  @IsNumber()
  chargingPowerPerChargePointKw: number;
}

export class UpdateSimulationApiDto extends PartialType(SimulationInputDto) {}
