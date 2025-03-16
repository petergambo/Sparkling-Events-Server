import { Module } from '@nestjs/common';
import { DataReloadlyService } from './data-reloadly.service';
import { DataReloadlyController } from './data-reloadly.controller';

@Module({
  controllers: [DataReloadlyController],
  providers: [DataReloadlyService],
})
export class DataReloadlyModule {}
