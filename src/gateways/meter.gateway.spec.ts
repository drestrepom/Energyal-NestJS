import { Test, TestingModule } from '@nestjs/testing';
import { MeterGateway } from './meter.gateway';

describe('MeterGateway', () => {
  let gateway: MeterGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeterGateway],
    }).compile();

    gateway = module.get<MeterGateway>(MeterGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
