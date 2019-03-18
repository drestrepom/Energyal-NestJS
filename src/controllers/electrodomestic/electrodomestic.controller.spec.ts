import { Test, TestingModule } from '@nestjs/testing';
import { ElectrodomesticController } from './electrodomestic.controller';

describe('Electrodomestic Controller', () => {
  let controller: ElectrodomesticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectrodomesticController],
    }).compile();

    controller = module.get<ElectrodomesticController>(ElectrodomesticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
