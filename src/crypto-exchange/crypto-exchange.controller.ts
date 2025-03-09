import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CryptoExchangeService } from './crypto-exchange.service';
import { CreateCryptoExchangeDto } from './dto/create-crypto-exchange.dto';
import { UpdateCryptoExchangeDto } from './dto/update-crypto-exchange.dto';

@Controller('crypto-exchange')
export class CryptoExchangeController {
  constructor(private readonly cryptoExchangeService: CryptoExchangeService) {}

  @Post()
  create(@Body() createCryptoExchangeDto: CreateCryptoExchangeDto) {
    return this.cryptoExchangeService.create(createCryptoExchangeDto);
  }

  @Get()
  findAll() {
    return this.cryptoExchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoExchangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptoExchangeDto: UpdateCryptoExchangeDto) {
    return this.cryptoExchangeService.update(+id, updateCryptoExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoExchangeService.remove(+id);
  }
}
