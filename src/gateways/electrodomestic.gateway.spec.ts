import { Test, TestingModule } from '@nestjs/testing';
import { ElectrodomesticGateway } from './electrodomestic.gateway';

describe('ElectrodomesticGateway', () => {
  let gateway: ElectrodomesticGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectrodomesticGateway],
    }).compile();

    gateway = module.get<ElectrodomesticGateway>(ElectrodomesticGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
