import { Test, TestingModule } from '@nestjs/testing';
import { GiftCardsService } from './gift-cards.service';

describe('GiftCardsService', () => {
  let service: GiftCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftCardsService],
    }).compile();

    service = module.get<GiftCardsService>(GiftCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
