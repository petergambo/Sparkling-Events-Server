/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Prisma, TransactionStatus } from '@prisma/client';
import { Paystack } from 'paystack-sdk';
import { FundRequestDto } from './dto/fund-request.dto';
import { generateVTPassRequestId } from 'src/utils/functions';
import { FundDto } from './dto/fund.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Controller('pay')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly paystack: Paystack,
    private readonly transactionService: TransactionsService) { }

  @Post("init")
  async create(@Body() fundRequestDto: FundRequestDto) {

    const updatedFundRequest = { ...fundRequestDto, ref: generateVTPassRequestId() }

    try {
      const initializePaymentGateway = await this.paystack.transaction.initialize(
        {
          amount: (updatedFundRequest.amount * 100).toString(),
          reference: updatedFundRequest.ref,
          email: updatedFundRequest.email,
          metadata: { userId: updatedFundRequest.userId },
        }
      )

      return {
        message: "Payment initialized successfully",
        data: initializePaymentGateway.data,
        test: "yes"
      };
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  @Post("finalize")
  async verify(@Body() fundDto: FundDto) {

    const verification_status = await this.paystack.transaction.verify(fundDto.reference)

    // Add or Update transaction record with paystacks data
    const createTransactionDto: Prisma.PaymentCreateInput = {
      reference: verification_status.data.reference,
      email: verification_status.data.customer.email,
      amount: verification_status.data.amount / 100,
      currency: verification_status.data.currency,
      description: "Booking Payment for Event",
      user: { connect: { id: fundDto.userId } },
      booking: { connect: { id: fundDto.bookingId } },
      method: 'Online - Paystack',
      status: verification_status.data.status == "success"
        ? TransactionStatus.SUCCESS : TransactionStatus.PENDING,
    }

    //  Create or update transaction record in our db with paystacks current data
    const transactionRecord = await this.transactionService.createOrUpdate(createTransactionDto)

    return {
      message: "Transaction Successful",
      transaction: transactionRecord,
    }
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: Prisma.PaymentUpdateInput) {
    return this.walletService.update(id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }
}
