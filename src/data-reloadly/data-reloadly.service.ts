/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDataReloadlyDto } from './dto/create-data-reloadly.dto';
import { UpdateDataReloadlyDto } from './dto/update-data-reloadly.dto';

@Injectable()
export class DataReloadlyService {
  create(createDataReloadlyDto: CreateDataReloadlyDto) {
    return 'This action adds a new dataReloadly';
  }

  findAll() {
    return `This action returns all dataReloadly`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataReloadly`;
  }

  update(id: number, updateDataReloadlyDto: UpdateDataReloadlyDto) {
    return `This action updates a #${id} dataReloadly`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataReloadly`;
  }
}
