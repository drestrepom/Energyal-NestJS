import { Test, TestingModule } from '@nestjs/testing';
import { MeasurmentService } from './measurment.service';

describe('MeasurmentService', () => {
  let service: MeasurmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurmentService],
    }).compile();

    service = module.get<MeasurmentService>(MeasurmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
