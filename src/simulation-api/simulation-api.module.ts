import { Module } from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import { SimulationApiController } from './simulation-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SimulationInput, SimulationInputSchema } from './schemas/simulation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SimulationInput.name, schema: SimulationInputSchema }])
  ],
  controllers: [SimulationApiController],
  providers: [SimulationApiService],
})
export class SimulationApiModule {}
