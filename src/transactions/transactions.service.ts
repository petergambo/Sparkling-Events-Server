/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService){}
  
  createOrUpdate(createProjectDto: Prisma.TransactionCreateInput) {
    return this.databaseService.transaction.upsert({
      where: { reference: createProjectDto.reference }, // Check if a transaction with the same reference exists
      update: createProjectDto, // Update if it exists
      create: createProjectDto, // Create a new one if it doesn't exist
    });
  }
  

  findAll() {
    return this.databaseService.transaction.findMany({include:{user: true}});
  }

  findOne(id: number) {
    return this.databaseService.transaction.findUnique({where: {id}, include:{user: true}});
  }

  update(id: number, updateProjectDto: Prisma.TransactionUpdateInput) {
    return this.databaseService.transaction.update({
      where:{id},
      data: updateProjectDto});
  }

  remove(id: number) {
    return this.databaseService.transaction.delete({where: {id}});
  }
}
