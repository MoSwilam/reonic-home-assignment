import { Module } from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import { SimulationApiController } from './simulation-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SimulationInput,
  SimulationInputSchema,
} from './schemas/simulation-input.schema';
import { SimulationLogicModule } from 'src/simulation-logic/simulation-logic.module';
import {
  SimulationOutput,
  SimulationOutputSchema,
} from './schemas/simulation-output.schema';

@Module({
  imports: [
    SimulationLogicModule,
    MongooseModule.forFeature([
      { name: SimulationInput.name, schema: SimulationInputSchema },
      { name: SimulationOutput.name, schema: SimulationOutputSchema },
    ]),
  ],
  controllers: [SimulationApiController],
  providers: [SimulationApiService],
})
export class SimulationApiModule {}
