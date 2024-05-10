import { Injectable } from '@nestjs/common';
import { SimulationInput, SimulationInputDocument } from './schemas/simulation.schema';
import { CreateSimulationApiDto } from './dto/create-simulation-api.dto';
import { UpdateSimulationApiDto } from './dto/update-simulation-api.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SimulationApiService {

  constructor(
    @InjectModel(SimulationInput.name)
    private simulationModel: Model<SimulationInputDocument>,
  ) {}

  async create(createSimulationApiDto: CreateSimulationApiDto) {
    return await this.simulationModel.create(createSimulationApiDto);
  }

  async findAll() {
    return await this.simulationModel.find();
  }

  async findOne(id: string) {
    return await this.simulationModel.findById(id)
  }

  async update(id: string, updateSimulationApiDto: UpdateSimulationApiDto) {
    return await this.simulationModel.findByIdAndUpdate(id, updateSimulationApiDto, { new: true });
  }

  async remove(id: string) {
    return await this.simulationModel.findByIdAndDelete(id);
  }
}
