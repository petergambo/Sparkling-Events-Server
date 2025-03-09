/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/middlewares/auth.service';

import * as bcrypt from 'bcryptjs';
import { generateAccountNumber } from 'src/utils/functions';



@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService, 
    private readonly authService: AuthService,
  ){}

  async create(createUserDto: Prisma.UserCreateInput) {

    const hashed_password = await this.authService.hashPassword(createUserDto.password);

    const updatedUserDto: Prisma.UserCreateInput = { 
      ...createUserDto, 
      password: hashed_password, 
      Wallet:{
        create:{walletNo: generateAccountNumber(), 
          pin: {create:{pin: "0000", changePinToken:"",}}}
      }};

    return this.databaseService.user.create({data: updatedUserDto});
  }


  async login(loginUserDTO: {email: string, password: string}) {
    const user = await this.databaseService.user.findUnique({where:{email: loginUserDTO.email}})
    console.log(user)
    if(user)
    {
      const passVerified = await bcrypt.compare(loginUserDTO.password, user.password)

      console.log("Pass verified", passVerified);
      
      if(passVerified)
      {return this.authService.generateToken(user.id)}

      return {message: "Invalid Login credentials"}
    }

    return {message: "Invalid Login credentials"};
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where:{id},
      include:{Wallet: true}
    })
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where:{id},
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.databaseService.user.delete({where:{id}});
  }
}
