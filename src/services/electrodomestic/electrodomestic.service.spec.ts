import { Test, TestingModule } from '@nestjs/testing';
import { ElectrodomesticService } from './electrodomestic.service';

describe('ElectrodomesticService', () => {
  let service: ElectrodomesticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectrodomesticService],
    }).compile();

    service = module.get<ElectrodomesticService>(ElectrodomesticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
