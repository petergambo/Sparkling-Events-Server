/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WaitListService {
  constructor(
    private readonly databaseService: DatabaseService, 
  ){}
  async create(createWaitListDto: Prisma.WaitListCreateInput) {
    const existingUser = await this.databaseService.waitList.findUnique({
      where: { email: createWaitListDto.email },
    });
  
    if (existingUser) {
      return { message: "This email is already on the waitlist." };
    }
  
    const newEntry = await this.databaseService.waitList.create({
      data: createWaitListDto,
    });
  
    return { message: "Congratulations! Successfully added to the waitlist.", data: newEntry };
  }
  

  findAll() {
    return this.databaseService.waitList.findMany();
  }

  findOne(id: number) {
    return this.databaseService.waitList.findFirst({where: {id}});
  }

}
