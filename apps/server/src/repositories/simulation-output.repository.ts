import { AbstractDocument } from '@app/common/database';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimulationInput, SimulationInputDocument } from '../schemas/simulation-input.schema';
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
