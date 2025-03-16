import { Test, TestingModule } from '@nestjs/testing';
import { BillsPayReloadlyController } from './bills-pay-reloadly.controller';
import { BillsPayReloadlyService } from './bills-pay-reloadly.service';

describe('BillsPayReloadlyController', () => {
  let controller: BillsPayReloadlyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsPayReloadlyController],
      providers: [BillsPayReloadlyService],
    }).compile();

    controller = module.get<BillsPayReloadlyController>(BillsPayReloadlyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
