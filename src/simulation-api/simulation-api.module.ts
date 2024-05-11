import { Module } from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import { SimulationApiController } from './simulation-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SimulationInput,
  SimulationInputSchema,
} from './schemas/simulation-input.schema';
import { SimulationModule } from 'src/simulation/simulation.module';
import {
  SimulationOutput,
  SimulationOutputSchema,
} from './schemas/simulation-output.schema';

@Module({
  imports: [
    SimulationModule,
    MongooseModule.forFeature([
      { name: SimulationInput.name, schema: SimulationInputSchema },
      { name: SimulationOutput.name, schema: SimulationOutputSchema },
    ]),
  ],
  controllers: [SimulationApiController],
  providers: [SimulationApiService],
})
export class SimulationApiModule {}
