import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillsPayService } from './bills-pay.service';
import { CreateBillsPayDto } from './dto/create-bills-pay.dto';
import { UpdateBillsPayDto } from './dto/update-bills-pay.dto';

@Controller('bills-pay')
export class BillsPayController {
  constructor(private readonly billsPayService: BillsPayService) {}

  @Post()
  create(@Body() createBillsPayDto: CreateBillsPayDto) {
    return this.billsPayService.create(createBillsPayDto);
  }

  @Get()
  findAll() {
    return this.billsPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsPayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillsPayDto: UpdateBillsPayDto) {
    return this.billsPayService.update(+id, updateBillsPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsPayService.remove(+id);
  }
}
