/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Prisma, ServiceType, TransactionStatus } from '@prisma/client';
import { Paystack } from 'paystack-sdk';
import { FundRequestDto } from './dto/fund-request.dto';
import { generateVTPassRequestId } from 'src/utils/functions';
import { FundDto } from './dto/fund.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService, 
    private readonly paystack: Paystack,
    private readonly transactionService: TransactionsService) {}

  @Post("generate-request")
  async create(@Body() fundRequestDto: FundRequestDto) {

    const updatedFundRequest = {...fundRequestDto, ref: generateVTPassRequestId()}

    const initializePaymentGateway = await this.paystack.transaction.initialize(
      {
        amount: (updatedFundRequest.amount * 100).toString(), 
        reference: updatedFundRequest.ref, 
        email: updatedFundRequest.email, 
        metadata: {userId: updatedFundRequest.userId},
      }
    )

    return {
      message:"Payment initialized successfully",
      data:initializePaymentGateway.data
    };
    
  }

  @Post("fund")
  async verify(@Body() fundDto: FundDto) {

    const verification_status = await this.paystack.transaction.verify(fundDto.reference)
    
    // Add or Update transaction record with paystacks data
     const createTransactionDto: Prisma.TransactionCreateInput = {
      reference: verification_status.data.reference,
      email: verification_status.data.customer.email,
      type: ServiceType.WALLET_TOPUP,
      amount: verification_status.data.amount/100,
      currency: verification_status.data.currency,
      description: "Wallet Top Up",
      user: {connect: {id: fundDto.id}},
      status: verification_status.data.status == "success" 
      ? TransactionStatus.SUCCESS : TransactionStatus.PENDING,
     }

    //  Create or update transaction record in our db with paystacks current data
    const transactionRecord = await this.transactionService.createOrUpdate(createTransactionDto)

    // Proceed to Wallet TopUp if status is success and wallet top up for it has not been processed yet 
    if(verification_status.data.status == "success" && transactionRecord.isTopUp == false)
    {
    const topUp = await this.walletService.topUp({
      amount: transactionRecord.amount,
      isTransactionProcessed: transactionRecord.isTopUp,
      userId: transactionRecord.userId
    })

    // update is isTopUp to true to avoid duplicated funding when checked again.
    // topUp has been programmed to use this value
    await this.transactionService.update(transactionRecord.id, {isTopUp: true})

    return {
      message: "Wallet toped up with amount",
      transaction: transactionRecord, 
      wallet: topUp, }
  }

  else if(verification_status.data.status == "success" && transactionRecord.isTopUp == true)
  {
    return {
      message: "Transaction Processed already",
      transaction: transactionRecord}
  }

  return {
    message: "Transaction Pending",
    transaction: transactionRecord}

  
  }

  @Post('balance')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: Prisma.WalletUpdateInput) {
    return this.walletService.update(id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }
}
