import {
  ApiBody,
  ApiHideProperty,
  ApiProperty,
  PartialType,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/abstract.schema';

export class SimulationInputDto extends AbstractDocument {
  @IsNumber()
  numberOfChargePoints: number;

  @IsNumber()
  @MaxLength(200)
  arrivalProbabilityMultiplier: number;

  @IsNumber()
  evConsumptionKwhPer100Km: number;

  @IsNumber()
  chargingPowerPerChargePointKw: number;
}

export class UpdateSimulationApiDto extends PartialType(SimulationInputDto) {}
