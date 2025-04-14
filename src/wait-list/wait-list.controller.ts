/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WaitListService } from './wait-list.service';
import { Prisma } from '@prisma/client';

@Controller('wait-list')
export class WaitListController {
  constructor(private readonly waitListService: WaitListService) {}

  @Post()
  create(@Body() createWaitListDto: Prisma.WaitListCreateInput) {
    return this.waitListService.create(createWaitListDto);
  }

  @Get()
  findAll() {
    return this.waitListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waitListService.findOne(id);
  }

}
