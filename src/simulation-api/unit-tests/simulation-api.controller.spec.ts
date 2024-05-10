import { Test, TestingModule } from '@nestjs/testing';
import { SimulationApiController } from '../simulation-api.controller';
import { SimulationApiService } from '../simulation-api.service';

describe('SimulationApiController', () => {
  let controller: SimulationApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationApiController],
      providers: [SimulationApiService],
    }).compile();

    controller = module.get<SimulationApiController>(SimulationApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
