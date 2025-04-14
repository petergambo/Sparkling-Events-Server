/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WalletService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createRequestDto: Prisma.WalletCreateInput) {
    return this.databaseService.wallet.create({ data: createRequestDto });
  }

  async topUp(topUpDto: {
    amount: number,
    isTransactionProcessed: boolean,
    userId: string
  }) {

    const wallet = await this.databaseService.wallet.findUnique({ where: { userId: topUpDto.userId } })

    // Check if transaction has been fulfilled before and do nothing
    if (topUpDto.isTransactionProcessed == true) {
      return wallet
    }

    // Else fulfill transaction and return new wallet record to user
    return this.databaseService.wallet.update({
      where: { userId: topUpDto.userId },
      data: {
        amount: wallet.amount + topUpDto.amount
      }
    });
  }

  async deduct(deductDto: {
    amount: number,
    isTransactionProcessed: boolean,
    userId: string
  }) {

    const wallet = await this.databaseService.wallet.findUnique({ where: { userId: deductDto.userId } })

    // Check if transaction has been fulfilled before and do nothing
    if (deductDto.isTransactionProcessed == true) {
      return wallet
    }

    // Else fulfill transaction and return new wallet record to user
    return this.databaseService.wallet.update({
      where: { userId: deductDto.userId },
      data: {
        amount: wallet.amount - deductDto.amount
      }
    });
  }



  async findAll() {
    return this.databaseService.wallet.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.wallet.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.databaseService.wallet.findFirst({ where: { user: { email: email } }, include: {pin: true} });
  }

  async update(id: string, updateRequestDto: Prisma.WalletUpdateInput) {
    return this.databaseService.wallet.update({ where: { id }, data: updateRequestDto });
  }

  async remove(id: string) {
    return this.databaseService.wallet.delete({ where: { id } });
  }

  // async authorization(id: number): boolean {
  //   const pinRecord = this.databaseService.wallet.delete({ where: { id }, include:{pin: true} });
  // }
}
