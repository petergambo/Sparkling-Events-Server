/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillsPayReloadlyService } from './bills-pay-reloadly.service';
import { CreateBillsPayReloadlyDto } from './dto/create-bills-pay-reloadly.dto';
// import { UpdateBillsPayReloadlyDto } from './dto/update-bills-pay-reloadly.dto';

@Controller('bills-pay-reloadly')
export class BillsPayReloadlyController {
  constructor(private readonly billsPayReloadlyService: BillsPayReloadlyService) {}

  @Post("purchase")
  create(@Body() createBillsPayReloadlyDto: CreateBillsPayReloadlyDto) {
    return this.billsPayReloadlyService.purchase(createBillsPayReloadlyDto);
  }

  @Get("billers")
  getBillers() {
    return this.billsPayReloadlyService.getBillers();
  }

}
