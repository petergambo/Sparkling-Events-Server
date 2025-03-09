import { Injectable } from '@nestjs/common';
import { CreateCryptoExchangeDto } from './dto/create-crypto-exchange.dto';
import { UpdateCryptoExchangeDto } from './dto/update-crypto-exchange.dto';

@Injectable()
export class CryptoExchangeService {
  create(createCryptoExchangeDto: CreateCryptoExchangeDto) {
    return 'This action adds a new cryptoExchange';
  }

  findAll() {
    return `This action returns all cryptoExchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoExchange`;
  }

  update(id: number, updateCryptoExchangeDto: UpdateCryptoExchangeDto) {
    return `This action updates a #${id} cryptoExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoExchange`;
  }
}
