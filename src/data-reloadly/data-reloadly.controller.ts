import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataReloadlyService } from './data-reloadly.service';
import { CreateDataReloadlyDto } from './dto/create-data-reloadly.dto';
import { UpdateDataReloadlyDto } from './dto/update-data-reloadly.dto';

@Controller('data-reloadly')
export class DataReloadlyController {
  constructor(private readonly dataReloadlyService: DataReloadlyService) {}

  @Post()
  create(@Body() createDataReloadlyDto: CreateDataReloadlyDto) {
    return this.dataReloadlyService.create(createDataReloadlyDto);
  }

  @Get()
  findAll() {
    return this.dataReloadlyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataReloadlyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataReloadlyDto: UpdateDataReloadlyDto) {
    return this.dataReloadlyService.update(+id, updateDataReloadlyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataReloadlyService.remove(+id);
  }
}
