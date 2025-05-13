/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestService } from './invest.service';
import { Prisma } from '@prisma/client';

@Controller('invest')
export class InvestController {
  constructor(private readonly investService: InvestService) {}

  @Post()
  create(@Body() createInvestDto: Prisma.InvestCreateInput) {
    return this.investService.create(createInvestDto);
  }

  @Get()
  findAll() {
    return this.investService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestDto: Prisma.InvestUpdateInput) {
    return this.investService.update(id, updateInvestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investService.remove(id);
  }
}
