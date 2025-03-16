import { Test, TestingModule } from '@nestjs/testing';
import { BillsPayReloadlyService } from './bills-pay-reloadly.service';

describe('BillsPayReloadlyService', () => {
  let service: BillsPayReloadlyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsPayReloadlyService],
    }).compile();

    service = module.get<BillsPayReloadlyService>(BillsPayReloadlyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
