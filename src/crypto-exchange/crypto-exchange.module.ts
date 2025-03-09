import { Module } from '@nestjs/common';
import { CryptoExchangeService } from './crypto-exchange.service';
import { CryptoExchangeController } from './crypto-exchange.controller';

@Module({
  controllers: [CryptoExchangeController],
  providers: [CryptoExchangeService],
})
export class CryptoExchangeModule {}
