/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AirtimeService } from './airtime.service';
import { PurchaseAirtimeDto } from './dto/create-airtime.dto';
import { WalletService } from 'src/wallet/wallet.service';
import { airtimeSchema } from './dto/validator';
import { TransactionsService } from 'src/transactions/transactions.service';
import { generateVTPassRequestId } from 'src/utils/functions';
import { ServiceType, TransactionStatus } from '@prisma/client';

@Controller('airtime')
export class AirtimeController {
  constructor(private readonly airtimeService: AirtimeService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionsService,
  ) { }

  @Post("buy")
  async purchase(@Body() buyAirtimeDto: PurchaseAirtimeDto) {

    // Validate Data
    const { error } = airtimeSchema.validate(buyAirtimeDto);
    if (error) {
      return { message: error }
    }

    // Check amount vs Wallet Balance
    const wallet = await this.walletService.findOneByEmail(buyAirtimeDto.email)

    if (!wallet) { return { message: "Invalid Identity" } }

    if (wallet && parseInt(buyAirtimeDto.amount) > wallet.amount) { return { message: "Insufficient Balance. Please top up your wallet and try again" } }

    if (wallet.pin.pin == buyAirtimeDto.pin.toString()) {
      // All conditions met. Proceed to buy airtime
      const apiStatus = await this.airtimeService.purchase(buyAirtimeDto)

      console.log("API Status", apiStatus);

      if (apiStatus) {
        // create transaction record
        const transaction = await this.transactionService.createOrUpdate({
          amount: parseInt(buyAirtimeDto.amount),
          currency: "NGN",
          description: `Purchased ${buyAirtimeDto.serviceID} airtime for ${buyAirtimeDto.phone}`,
          email: buyAirtimeDto.email,
          reference: generateVTPassRequestId(),
          status: TransactionStatus.SUCCESS,
          type: ServiceType.AIRTIME,
          user: { connect: { id: wallet.userId } },

        })
        // Deduct from wallet
        if (transaction.isTopUp == false) {
          const walletUpdate = await this.walletService.deduct({ amount: parseInt(buyAirtimeDto.amount), userId: wallet.userId, isTransactionProcessed: transaction.isTopUp })

          await this.transactionService.update(transaction.id, { isTopUp: true })

          return { message: "Airtime Purchased Successfully", transaction: transaction, wallet: walletUpdate }
        }
        else {
          return { message: "Airtime already purched", transaction: transaction }
        }
      }
      else {
        return { message: "Unable to process Transaction", transaction: apiStatus }
      }

    }

    return { message: "Invalid Authorization" }
  }


}
