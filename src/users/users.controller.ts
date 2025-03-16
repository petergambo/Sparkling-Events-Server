/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthMiddleware } from 'src/middlewares/jwt-auth.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Post("login")
  login(@Body() loginUserDTO: {email: string, password: string}) {
    return this.usersService.login(loginUserDTO);
  }

  @Get()
  @UseGuards(JwtAuthMiddleware)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthMiddleware)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('current/logged-in')
  findCurrentUser(@Req() req) {
    console.log("Request User:", req.user); // Debugging
    return this.usersService.findOne(parseInt(req.user)); // Extract user ID from request
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
