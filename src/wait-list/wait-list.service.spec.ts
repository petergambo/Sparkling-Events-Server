import { Test, TestingModule } from '@nestjs/testing';
import { WaitListService } from './wait-list.service';

describe('WaitListService', () => {
  let service: WaitListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitListService],
    }).compile();

    service = module.get<WaitListService>(WaitListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
