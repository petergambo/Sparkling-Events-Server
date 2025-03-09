import { PartialType } from '@nestjs/mapped-types';
import { PurchaseAirtimeDto } from './create-airtime.dto';

export class UpdateAirtimeDto extends PartialType(PurchaseAirtimeDto) {}
