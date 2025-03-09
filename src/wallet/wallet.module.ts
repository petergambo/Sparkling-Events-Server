/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Paystack } from 'paystack-sdk';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, TransactionsService,
    {
      provide: Paystack, // Register Paystack as a NestJS provider
      useValue: new Paystack(process.env.PAYSTACK_SECRET_KEY || ""),
    },
  ],
  exports:[WalletService]
})
export class WalletModule {}
