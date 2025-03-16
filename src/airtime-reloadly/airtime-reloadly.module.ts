/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AirtimeReloadlyService } from './airtime-reloadly.service';
import { AirtimeReloadlyController } from './airtime-reloadly.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports:[WalletModule],
  controllers: [AirtimeReloadlyController],
  providers: [AirtimeReloadlyService, TransactionsService],
})
export class AirtimeReloadlyModule {}
