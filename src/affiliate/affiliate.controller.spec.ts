import { Test, TestingModule } from '@nestjs/testing';
import { AffiliateController } from './affiliate.controller';
import { AffiliateService } from './affiliate.service';

describe('AffiliateController', () => {
  let controller: AffiliateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffiliateController],
      providers: [AffiliateService],
    }).compile();

    controller = module.get<AffiliateController>(AffiliateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
