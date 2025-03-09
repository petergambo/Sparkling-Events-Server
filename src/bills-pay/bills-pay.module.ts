import { Module } from '@nestjs/common';
import { BillsPayService } from './bills-pay.service';
import { BillsPayController } from './bills-pay.controller';

@Module({
  controllers: [BillsPayController],
  providers: [BillsPayService],
})
export class BillsPayModule {}
