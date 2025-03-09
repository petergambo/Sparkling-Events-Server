import { Test, TestingModule } from '@nestjs/testing';
import { CryptoExchangeController } from './crypto-exchange.controller';
import { CryptoExchangeService } from './crypto-exchange.service';

describe('CryptoExchangeController', () => {
  let controller: CryptoExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoExchangeController],
      providers: [CryptoExchangeService],
    }).compile();

    controller = module.get<CryptoExchangeController>(CryptoExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
