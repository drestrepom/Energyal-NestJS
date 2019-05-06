import { Test, TestingModule } from '@nestjs/testing';
import { ValueKwhService } from './value-kwh.service';

describe('ValueKwhService', () => {
  let service: ValueKwhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValueKwhService],
    }).compile();

    service = module.get<ValueKwhService>(ValueKwhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
