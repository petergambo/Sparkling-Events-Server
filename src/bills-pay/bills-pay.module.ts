/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BillsPayService } from './bills-pay.service';
import { BillsPayController } from './bills-pay.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports: [WalletModule],
  controllers: [BillsPayController],
  providers: [BillsPayService, TransactionsService],
})
export class BillsPayModule {}
