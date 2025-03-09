/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionController } from './transactions.controller';

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
