import { Injectable } from '@nestjs/common';
import { CreateBillsPayDto } from './dto/create-bills-pay.dto';
import { UpdateBillsPayDto } from './dto/update-bills-pay.dto';

@Injectable()
export class BillsPayService {
  create(createBillsPayDto: CreateBillsPayDto) {
    return 'This action adds a new billsPay';
  }

  findAll() {
    return `This action returns all billsPay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billsPay`;
  }

  update(id: number, updateBillsPayDto: UpdateBillsPayDto) {
    return `This action updates a #${id} billsPay`;
  }

  remove(id: number) {
    return `This action removes a #${id} billsPay`;
  }
}
