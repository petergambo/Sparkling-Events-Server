/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AirtimeReloadlyService } from './airtime-reloadly.service';
import { CreateAirtimeReloadlyDto } from './dto/create-airtime-reloadly.dto';

import { WalletService } from 'src/wallet/wallet.service';
// import { airtimeSchema } from './dto/validator';
import { TransactionsService } from 'src/transactions/transactions.service';
import { generateVTPassRequestId, sendEmail } from 'src/utils/functions';
import { TransactionStatus, ServiceType } from '@prisma/client';

@Controller('airtime-reloadly')
export class AirtimeReloadlyController {
  constructor(
    private readonly airtimeReloadlyService: AirtimeReloadlyService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionsService,
  ) {}

  @Post('buy')
  async buy(@Body() createAirtimeReloadlyDto: CreateAirtimeReloadlyDto) {
    // Validate Data
    // const { error } = airtimeSchema.validate(createAirtimeReloadlyDto);
    // if (error) {
    //   return { message: error.details[0].message };
    // }

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
        description: `Purchased airtime for ${createAirtimeReloadlyDto.recipientPhone.number}`,
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

        try {
          await sendEmail(
            createAirtimeReloadlyDto.recipientEmail,
            `<p>You have successfully purchased ${transaction.currency}${transaction.amount} for ${createAirtimeReloadlyDto.recipientPhone.number} </p> <p>Date: ${transaction.createdAt}<br/>
            Transaction Reference: ${transaction.reference}</p> <p>Thank you for transacting with us</p>`,
            
            `Airtime Purchase Successful!`, 
            
            "Transaction Notification"
          )
         } catch (error) {
          console.log(error)
         }
         
        return {
          message: 'Airtime Purchased Successfully',
          transaction,
          wallet: walletUpdate,
        };
      } else {
        return { message: 'Airtime already purchased', transaction };
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
