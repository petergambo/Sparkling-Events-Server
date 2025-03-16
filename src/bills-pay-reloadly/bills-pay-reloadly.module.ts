import { Module } from '@nestjs/common';
import { BillsPayReloadlyService } from './bills-pay-reloadly.service';
import { BillsPayReloadlyController } from './bills-pay-reloadly.controller';

@Module({
  controllers: [BillsPayReloadlyController],
  providers: [BillsPayReloadlyService],
})
export class BillsPayReloadlyModule {}
