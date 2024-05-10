import { SimulationOutput } from '../../simulation-api/schemas/simulation-output.schema';
import { SimulationInputDto } from './simulation.request.dto';

export class SimulationResponseDto extends SimulationInputDto {
  output: SimulationOutput;
}
