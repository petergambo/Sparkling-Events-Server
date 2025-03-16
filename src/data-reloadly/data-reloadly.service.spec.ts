import { Test, TestingModule } from '@nestjs/testing';
import { DataReloadlyService } from './data-reloadly.service';

describe('DataReloadlyService', () => {
  let service: DataReloadlyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataReloadlyService],
    }).compile();

    service = module.get<DataReloadlyService>(DataReloadlyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
