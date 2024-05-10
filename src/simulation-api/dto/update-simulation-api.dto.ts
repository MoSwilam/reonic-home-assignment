import { PartialType } from '@nestjs/mapped-types';
import { CreateSimulationApiDto } from './create-simulation-api.dto';

export class UpdateSimulationApiDto extends PartialType(CreateSimulationApiDto) {}
