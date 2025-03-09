import { Test, TestingModule } from '@nestjs/testing';
import { BillsPayService } from './bills-pay.service';

describe('BillsPayService', () => {
  let service: BillsPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsPayService],
    }).compile();

    service = module.get<BillsPayService>(BillsPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
