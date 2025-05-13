import { Test, TestingModule } from '@nestjs/testing';
import { InvestController } from './invest.controller';
import { InvestService } from './invest.service';

describe('InvestController', () => {
  let controller: InvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestController],
      providers: [InvestService],
    }).compile();

    controller = module.get<InvestController>(InvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
