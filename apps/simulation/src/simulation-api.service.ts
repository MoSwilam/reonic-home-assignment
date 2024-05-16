import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SimulationInput, SimulationInputDocument } from './schemas/simulation-input.schema';
import { SimulationOutput, SimulationOutputDocument } from './schemas/simulation-output.schema';
import { SimulationInputDto, UpdateSimulationApiDto } from './dto/simulation.request.dto';
import { SimulationResponseDto } from './dto/simulation.response.dto';
import { SimulationService } from './simulation.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SimulationApiService {
  constructor(
    @InjectModel(SimulationInput.name)
    private simulationInputModel: Model<SimulationInputDocument>,
    @InjectModel(SimulationOutput.name)
    private simulationOutputModel: Model<SimulationOutputDocument>,
    private simulationService: SimulationService,
  ) {}

  async create(payload: SimulationInputDto): Promise<SimulationResponseDto> {
    const simulationResult = this.simulationService.runSimulation(payload);
    if (!simulationResult) throw new BadRequestException('Simulation failed');

    const simualationDoc = await this.simulationOutputModel.create(simulationResult);
    if (!simualationDoc) throw new BadRequestException('Error while saving simulation output');

    const simulationInputAndOutput = (await this.simulationInputModel.create({...payload,output: simualationDoc._id,})).populate('output');
    if (!simulationInputAndOutput) throw new BadRequestException('Error while saving simulation input and output');

    return simulationInputAndOutput;
  }

  async findByIdOrThrow(id: string): Promise<SimulationInputDocument> {
    const simulationInput = await this.simulationInputModel.findById(id);
    if (!simulationInput) throw new NotFoundException('Simulation not found');
    return simulationInput;
  }

  async findAll(): Promise<SimulationOutput[]> {
    return await this.simulationInputModel.find();
  }

  async update(id: string, updateSimulationApiDto: UpdateSimulationApiDto): Promise<SimulationInputDocument> {
    await this.findByIdOrThrow(id);
    return await this.simulationInputModel.findByIdAndUpdate(id, updateSimulationApiDto, { new: true });
  }

  async remove(id: string): Promise<SimulationInputDocument> {
    await this.findByIdOrThrow(id);
    return await this.simulationInputModel.findByIdAndDelete(id);
  }
}
