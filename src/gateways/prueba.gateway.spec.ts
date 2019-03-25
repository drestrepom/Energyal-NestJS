import { Test, TestingModule } from '@nestjs/testing';
import { PruebaGateway } from './prueba.gateway';

describe('PruebaGateway', () => {
  let gateway: PruebaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PruebaGateway],
    }).compile();

    gateway = module.get<PruebaGateway>(PruebaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
