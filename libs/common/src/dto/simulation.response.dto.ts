import { SimulationOutput } from 'apps/server/src/schemas/simulation-output.schema';
import { SimulationInputDto } from './simulation.request.dto';

export class SimulationResponseDto {
  input: SimulationInputDto;
  output: SimulationOutput;
}
