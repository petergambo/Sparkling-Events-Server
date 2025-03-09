import { Test, TestingModule } from '@nestjs/testing';
import { CryptoExchangeService } from './crypto-exchange.service';

describe('CryptoExchangeService', () => {
  let service: CryptoExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoExchangeService],
    }).compile();

    service = module.get<CryptoExchangeService>(CryptoExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
