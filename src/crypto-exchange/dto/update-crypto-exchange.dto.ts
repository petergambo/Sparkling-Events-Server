import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoExchangeDto } from './create-crypto-exchange.dto';

export class UpdateCryptoExchangeDto extends PartialType(CreateCryptoExchangeDto) {}
