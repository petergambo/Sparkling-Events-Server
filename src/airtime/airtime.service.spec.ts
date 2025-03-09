/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AirtimeService } from './airtime.service';

describe('AirtimeService', () => {
  let service: AirtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirtimeService],
    }).compile();

    service = module.get<AirtimeService>(AirtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
