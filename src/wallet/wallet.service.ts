/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WalletService {
  constructor(private readonly databaseService: DatabaseService) { }

  // async create(createRequestDto: Prisma.WalletCreateInput) {
  //   return this.databaseService.wallet.create({ data: createRequestDto });
  // }

  async topUp(topUpDto: {
    amount: number,
    isTransactionProcessed: boolean,
    reference: string
  }) {

    const payment = await this.databaseService.payment.findUnique({ where: { reference: topUpDto.reference } })

    // Check if transaction has been fulfilled before and do nothing
    if (topUpDto.isTransactionProcessed == true) {
      return payment
    }

    // Else fulfill transaction and return new wallet record to user
    return this.databaseService.payment.update({
      where: { reference: topUpDto.reference },
      data: {
        amount: payment.amount + topUpDto.amount
      }
    });
  }



  async findAll() {
    return this.databaseService.payment.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.payment.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.databaseService.payment.findFirst({ where: { user: { email: email } }});
  }

  async update(id: string, updateRequestDto: Prisma.PaymentUpdateInput) {
    return this.databaseService.payment.update({ where: { id }, data: updateRequestDto });
  }

  async remove(id: string) {
    return this.databaseService.payment.delete({ where: { id } });
  }

  // async authorization(id: number): boolean {
  //   const pinRecord = this.databaseService.wallet.delete({ where: { id }, include:{pin: true} });
  // }
}
