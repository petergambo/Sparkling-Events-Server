import { Test, TestingModule } from '@nestjs/testing';
import { AirtimeReloadlyController } from './airtime-reloadly.controller';
import { AirtimeReloadlyService } from './airtime-reloadly.service';

describe('AirtimeReloadlyController', () => {
  let controller: AirtimeReloadlyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirtimeReloadlyController],
      providers: [AirtimeReloadlyService],
    }).compile();

    controller = module.get<AirtimeReloadlyController>(AirtimeReloadlyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
