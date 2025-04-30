/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService){}
  
  createOrUpdate(createProjectDto: Prisma.PaymentCreateInput) {
    return this.databaseService.payment.upsert({
      where: { reference: createProjectDto.reference }, // Check if a transaction with the same reference exists
      update: createProjectDto, // Update if it exists
      create: createProjectDto, // Create a new one if it doesn't exist
    });
  }

  findAll() {
    return this.databaseService.payment.findMany({include:{user: true}, orderBy:{createdAt: 'desc'}});
  }

  findAllByUserId(id: string) {
    return this.databaseService.payment.findMany({where: {userId: id},include:{user: true}, orderBy:{createdAt: 'desc'}});
  }

  findOne(id: string) {
    return this.databaseService.payment.findUnique({where: {id}, include:{user: true}});
  }

  update(id: string, updateProjectDto: Prisma.PaymentCreateInput) {
    return this.databaseService.payment.update({
      where:{id},
      data: updateProjectDto});
  }

  remove(id: string) {
    return this.databaseService.payment.delete({where: {id}});
  }
}
