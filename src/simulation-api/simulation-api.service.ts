import { Injectable } from '@nestjs/common';
import { SimulationInput, SimulationInputDocument } from './schemas/simulation-input.schema';
import { SimulationInputDto, UpdateSimulationApiDto } from '../common/dto/simulation.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimulationService } from 'src/simulation/simulation.service';
import { SimulationResponseDto } from '../common/dto/simulation.response.dto';
import { SimulationOutput, SimulationOutputDocument } from './schemas/simulation-output.schema';

@Injectable()
export class SimulationApiService {

  constructor(
    @InjectModel(SimulationInput.name)
    private simulationInputModel: Model<SimulationInputDocument>,
    @InjectModel(SimulationOutput.name)
    private simulationOutputModel: Model<SimulationOutputDocument>,
    private simulationService: SimulationService
  ) {}

  async create(payload: SimulationInputDto): Promise<SimulationResponseDto> {
    const simulationResult = this.simulationService.runSimulation();
    const simualationDoc = await this.simulationOutputModel.create(simulationResult);
    return (await this.simulationInputModel.create({...payload, output: simualationDoc._id})).populate('output');
  }

  async findAll(): Promise<SimulationOutput[]> {
    return await this.simulationInputModel.find();
  }

  async findOne(id: string): Promise<SimulationInputDocument> {
    return await this.simulationInputModel.findById(id);
  }

  async update(id: string, updateSimulationApiDto: UpdateSimulationApiDto): Promise<SimulationInputDocument> {
    return await this.simulationInputModel.findByIdAndUpdate(id, updateSimulationApiDto, { new: true });
  }

  async remove(id: string): Promise<SimulationInputDocument> {
    return await this.simulationInputModel.findByIdAndDelete(id);
  }
}
