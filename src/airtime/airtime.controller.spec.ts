import { Test, TestingModule } from '@nestjs/testing';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';

describe('AirtimeController', () => {
  let controller: AirtimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirtimeController],
      providers: [AirtimeService],
    }).compile();

    controller = module.get<AirtimeController>(AirtimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
