import { Test, TestingModule } from '@nestjs/testing';
import { DataReloadlyController } from './data-reloadly.controller';
import { DataReloadlyService } from './data-reloadly.service';

describe('DataReloadlyController', () => {
  let controller: DataReloadlyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataReloadlyController],
      providers: [DataReloadlyService],
    }).compile();

    controller = module.get<DataReloadlyController>(DataReloadlyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
