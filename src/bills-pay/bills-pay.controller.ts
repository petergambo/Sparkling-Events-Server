/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillsPayService } from './bills-pay.service';
import { CreateBillsPayDto, MerchantVerifyDTO } from './dto/create-bills-pay.dto';
// import { UpdateBillsPayDto } from './dto/update-bills-pay.dto';
import { billsPaySchema } from './dto/validator';
import { WalletService } from 'src/wallet/wallet.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { generateVTPassRequestId, sendEmail } from 'src/utils/functions';
import { ServiceType, TransactionStatus } from '@prisma/client';

@Controller('bills-pay')
export class BillsPayController {
  constructor(
    private readonly billsPayService: BillsPayService,  
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionsService,) {}

  @Post('purchase/:serviceID')
  async create(@Body() createBillsPayDto: CreateBillsPayDto, @Param('serviceID') serviceID: string) {
    // Validate Data
    const { error } = billsPaySchema.validate(createBillsPayDto);
    if (error) {
      return { message: error }
    }

    // Check amount vs Wallet Balance
    const wallet = await this.walletService.findOneByEmail(createBillsPayDto.email)

    if (!wallet) { return { message: "Invalid Identity" } }

    if (wallet && parseInt(createBillsPayDto.amount) > wallet.amount) { return { message: "Insufficient Balance. Please top up your wallet and try again" } }

    if (wallet.pin.pin == createBillsPayDto.pin.toString()) {
      // All conditions met. Proceed to buy airtime
      const payload = {
        ...createBillsPayDto, 
        request_id: generateVTPassRequestId(),
        serviceID: serviceID
      }
      const apiStatus = await this.billsPayService.makePayment(payload)

      if (apiStatus) {
        // create transaction record
        const transaction = await this.transactionService.createOrUpdate({
          amount: parseInt(createBillsPayDto.amount),
          currency: "NGN",
          description: `Purchased ${serviceID} subscription for ${createBillsPayDto.billersCode}`,
          email: createBillsPayDto.email,
          reference: apiStatus.requestId,
          status: TransactionStatus.SUCCESS,
          type: ServiceType.CABLE,
          user: { connect: { id: wallet.userId } },

        })
        // Deduct from wallet
        if (transaction.isTopUp == false) {
          const walletUpdate = await this.walletService.deduct({ amount: parseInt(createBillsPayDto.amount), userId: wallet.userId, isTransactionProcessed: transaction.isTopUp })

          await this.transactionService.update(transaction.id, { isTopUp: true })

          try {
            await sendEmail(
              createBillsPayDto.email,
              `<p>You have successfully subscribed ${serviceID} with ${transaction.currency}${transaction.amount} for ${createBillsPayDto.billersCode} </p> <p>Date: ${transaction.createdAt}<br/>
              Transaction Reference: ${transaction.reference}</p> <p>Thank you for transacting with us</p>`,
              
              `Cable Purchase Successful!`, 
              
              "Transaction Notification"
            )
           } catch (error) {
            console.log(error)
           }
          return { message: "Cable Subscribed Successfully", transaction: transaction, wallet: walletUpdate }
        }
        else {
          return { message: "Cable already subscribed", transaction: transaction }
        }
      }
      else {
        return { message: "Unable to process Transaction", transaction: apiStatus }
      }

    }

    return { message: "Invalid Authorization" }
  }

  @Get('/variation/pull/:serviceID')
  updateProviders(@Param('serviceID') serviceID: string) {
    return this.billsPayService.updateVariationsFromProvider(serviceID);
  }

  @Get('/variation/:serviceID')
  findOne(@Param('serviceID') serviceID: string) {
    return this.billsPayService.billsPayVariations(serviceID);
  }

  @Post('/verify-merchant')
  verifyMerchant(@Body() verifyMerchantDto: MerchantVerifyDTO,) {
    return this.billsPayService.cableCodeVerify(verifyMerchantDto);
  }


}
