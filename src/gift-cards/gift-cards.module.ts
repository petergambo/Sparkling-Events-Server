/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';
import { GiftCardsController } from './gift-cards.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  imports:[WalletModule],
  controllers: [GiftCardsController],
  providers: [GiftCardsService, TransactionsService],
})
export class GiftCardsModule {}
