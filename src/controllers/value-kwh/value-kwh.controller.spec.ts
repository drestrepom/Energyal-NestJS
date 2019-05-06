import { Test, TestingModule } from '@nestjs/testing';
import { ValueKwhController } from './value-kwh.controller';

describe('ValueKwh Controller', () => {
  let controller: ValueKwhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValueKwhController],
    }).compile();

    controller = module.get<ValueKwhController>(ValueKwhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
