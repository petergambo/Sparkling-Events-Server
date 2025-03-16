import { Test, TestingModule } from '@nestjs/testing';
import { AirtimeReloadlyService } from './airtime-reloadly.service';

describe('AirtimeReloadlyService', () => {
  let service: AirtimeReloadlyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirtimeReloadlyService],
    }).compile();

    service = module.get<AirtimeReloadlyService>(AirtimeReloadlyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
