import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementGateway } from './measurement.gateway';

describe('MeasurementGateway', () => {
  let gateway: MeasurementGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementGateway],
    }).compile();

    gateway = module.get<MeasurementGateway>(MeasurementGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
