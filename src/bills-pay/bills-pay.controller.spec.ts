import { Test, TestingModule } from '@nestjs/testing';
import { BillsPayController } from './bills-pay.controller';
import { BillsPayService } from './bills-pay.service';

describe('BillsPayController', () => {
  let controller: BillsPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsPayController],
      providers: [BillsPayService],
    }).compile();

    controller = module.get<BillsPayController>(BillsPayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
