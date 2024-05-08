import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get()
  runSimulation() {
    return this.simulationService.runSimulation();
  }
}
