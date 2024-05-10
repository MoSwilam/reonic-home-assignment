import { Test, TestingModule } from '@nestjs/testing';
import { SimulationApiService } from './simulation-api.service';

describe('SimulationApiService', () => {
  let service: SimulationApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationApiService],
    }).compile();

    service = module.get<SimulationApiService>(SimulationApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
