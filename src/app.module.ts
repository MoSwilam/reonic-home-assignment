import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulateModule } from './simulate/simulate.module';
import { SimulationModule } from './simulation/simulation.module';

@Module({
  imports: [SimulateModule, SimulationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
