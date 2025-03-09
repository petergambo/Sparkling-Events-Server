import { Test, TestingModule } from '@nestjs/testing';
import { GiftCardsController } from './gift-cards.controller';
import { GiftCardsService } from './gift-cards.service';

describe('GiftCardsController', () => {
  let controller: GiftCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftCardsController],
      providers: [GiftCardsService],
    }).compile();

    controller = module.get<GiftCardsController>(GiftCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
