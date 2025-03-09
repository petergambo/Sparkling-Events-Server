import { PartialType } from '@nestjs/mapped-types';
import { CreateBillsPayDto } from './create-bills-pay.dto';

export class UpdateBillsPayDto extends PartialType(CreateBillsPayDto) {}
