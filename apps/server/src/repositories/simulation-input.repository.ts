import { AbstractDocument, AbstractRepository } from '@reonic/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimulationInput, SimulationInputDocument } from '../schemas/simulation-input.schema';

@Injectable()
export class SimulationInputRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(SimulationInputRepository.name);

  constructor(
    @InjectModel(SimulationInput.name)
    simulationInputModel: Model<SimulationInputDocument>,
  ) {
    super(simulationInputModel);
  }
}
