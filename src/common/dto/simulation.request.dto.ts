import { ApiBody, ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/abstract.schema';


export class SimulationInputDto extends AbstractDocument {
  @IsNumber()
  numberOfChargePoints: number;

  @IsNumber()
  arrivalProbabilityMultiplier: number;

  @IsNumber()
  consumptionPerCar: number;

  @IsNumber()
  chargingPowerPerPoint: number;
}

export class UpdateSimulationApiDto extends PartialType(SimulationInputDto) {}