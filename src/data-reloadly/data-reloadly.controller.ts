/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { DataReloadlyService } from './data-reloadly.service';
import { CreateDataReloadlyDto } from './dto/create-data-reloadly.dto';

import { WalletService } from 'src/wallet/wallet.service';
// import { airtimeSchema } from './dto/validator';
import { TransactionsService } from 'src/transactions/transactions.service';
import { generateVTPassRequestId } from 'src/utils/functions';
import { TransactionStatus, ServiceType } from '@prisma/client';

@Controller('data-reloadly')
export class AirtimeReloadlyController {
  constructor(
    private readonly airtimeReloadlyService: DataReloadlyService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionsService,
  ) {}


  
  @Post('buy')
  async create(@Body() createAirtimeReloadlyDto: CreateDataReloadlyDto) {
    // Check amount vs Wallet Balance
    const wallet = await this.walletService.findOneByEmail(createAirtimeReloadlyDto.recipientEmail);

    if (!wallet) {
      return { message: 'Invalid Identity' };
    }

    if (wallet.amount < createAirtimeReloadlyDto.amount) {
      return { message: 'Insufficient Balance. Please top up your wallet and try again' };
    }

    if (wallet.pin.pin == createAirtimeReloadlyDto.pin.toString()) {

    // All conditions met. Proceed to buy airtime
    const apiStatus = await this.airtimeReloadlyService.purchase(createAirtimeReloadlyDto);

    console.log('API Status:', apiStatus);

    if (apiStatus) {
      // Create transaction record
      const transaction = await this.transactionService.createOrUpdate({
        amount: createAirtimeReloadlyDto.amount,
        currency: 'NGN',
        description: `Purchased Data for ${createAirtimeReloadlyDto.recipientPhone.number}`,
        email: createAirtimeReloadlyDto.recipientEmail,
        reference: generateVTPassRequestId(),
        status: TransactionStatus.SUCCESS,
        type: ServiceType.AIRTIME,
        user: { connect: { id: wallet.userId } },
      });

      // Deduct from wallet
      if (!transaction.isTopUp) {
        const walletUpdate = await this.walletService.deduct({
          amount: createAirtimeReloadlyDto.amount,
          userId: wallet.userId,
          isTransactionProcessed: transaction.isTopUp,
        });

        await this.transactionService.update(transaction.id, { isTopUp: true });

        return {
          message: 'Data Purchased Successfully',
          transaction,
          wallet: walletUpdate,
        };
      } else {
        return { message: 'Data already purchased', transaction };
      }
    } else {
      return { message: 'Unable to process Transaction', transaction: apiStatus };
    }
  }
  else {
    return { message: 'Invalid Transaction Pin.'}
  }
  }



  @Get('operators')
  getOperators() {
    return this.airtimeReloadlyService.getOperators();
  }
}
