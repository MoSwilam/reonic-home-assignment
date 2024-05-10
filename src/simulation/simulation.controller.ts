import {
  Controller,
  Get,
} from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SimulationOutput } from 'src/simulation-api/schemas/simulation-output.schema';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get('/mock/run')
  @ApiOperation({ summary: 'Run mock simulation', description: 'This endpoint runs a mock simulation'})
  @ApiResponse({
    type: SimulationOutput
  })
  runSimulation(): Omit<SimulationOutput, '_id'> {
    return this.simulationService.runSimulation();
  }
}
