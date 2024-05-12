import { Controller, Get } from '@nestjs/common';
import { SimulationLogicService } from './simulation-logic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimulationOutput } from 'src/simulation-api/schemas/simulation-output.schema';

@ApiTags('Mock Simulation')
@Controller('simulation')
export class SimulationLogicController {
  constructor(private readonly simulationService: SimulationLogicService) {}

  @Get('/mock/run')
  @ApiOperation({
    summary: 'Run mock simulation',
    description: 'This endpoint runs a mock simulation',
  })
  @ApiResponse({
    type: SimulationOutput,
  })
  runSimulation(): Omit<SimulationOutput, '_id'> {
    return this.simulationService.runSimulation();
  }
}
