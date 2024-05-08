import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';

@Injectable()
export class SimulationService {
  private readonly NUM_CHARGE_POINTS = 20;
  private readonly TOTAL_INTERVALS = 35040;
  private readonly POWER_KW = 11;


  runSimulation() {
    return 'This action runs a simulation';
  }
}
