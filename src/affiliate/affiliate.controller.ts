/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { Prisma } from '@prisma/client';

@Controller('affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Post()
  create(@Body() createAffiliateDto: Prisma.AffiliateCreateInput) {
    return this.affiliateService.create(createAffiliateDto);
  }

  @Get()
  findAll() {
    return this.affiliateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffiliateDto: Prisma.AffiliateUpdateInput) {
    return this.affiliateService.update(id, updateAffiliateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliateService.remove(id);
  }
}
