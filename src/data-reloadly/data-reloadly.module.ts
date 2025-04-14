/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DataReloadlyService } from './data-reloadly.service';
import { AirtimeReloadlyController } from './data-reloadly.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports:[WalletModule],
  controllers: [AirtimeReloadlyController],
  providers: [DataReloadlyService, TransactionsService],
})
export class DataReloadlyModule {}
