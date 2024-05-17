import { AbstractDocument, AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimulationInput } from '../schemas/simulation-input.schema';
import { SimulationOutputDocument } from '../schemas/simulation-output.schema';

@Injectable()
export class SimulationOutputRepository extends AbstractRepository<AbstractDocument> {
  protected readonly logger = new Logger(SimulationOutputRepository.name);

  constructor(
    @InjectModel(SimulationInput.name)
    simulationOutputModel: Model<SimulationOutputDocument>,
  ) {
    super(simulationOutputModel);
  }
}
