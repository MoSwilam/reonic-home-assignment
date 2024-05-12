import { Module } from '@nestjs/common';
import { SimulationLogicService } from './simulation-logic.service';
import { SimulationLogicController } from './simulation-logic.controller';

@Module({
  controllers: [SimulationLogicController],
  providers: [SimulationLogicService],
  exports: [SimulationLogicService],
})
export class SimulationLogicModule {}
