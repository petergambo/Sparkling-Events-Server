import { Test, TestingModule } from '@nestjs/testing';
import { WaitListController } from './wait-list.controller';
import { WaitListService } from './wait-list.service';

describe('WaitListController', () => {
  let controller: WaitListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitListController],
      providers: [WaitListService],
    }).compile();

    controller = module.get<WaitListController>(WaitListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
