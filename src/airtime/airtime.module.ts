/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { AirtimeController } from './airtime.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports: [WalletModule],
  controllers: [AirtimeController],
  providers: [AirtimeService, TransactionsService],
})
export class AirtimeModule {}
