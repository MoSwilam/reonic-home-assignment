import {
  PartialType,
} from '@nestjs/swagger';
import {
  IsNumber,
} from 'class-validator';
import { AbstractDocument } from 'src/common/abstract.schema';

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
