/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Prisma } from '@prisma/client';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly projectsService: TransactionsService) {}

  @Post("add")
  create(@Body() createProjectDto: Prisma.PaymentCreateInput) {
    return this.projectsService.createOrUpdate(createProjectDto);
  }

  @Get("all")
  findAll() {
    return this.projectsService.findAll();
  }

  @Get("all/current-user")
  findAllCurrentUser(@Req() req) {
    return this.projectsService.findAllByUserId(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.PaymentCreateInput) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
