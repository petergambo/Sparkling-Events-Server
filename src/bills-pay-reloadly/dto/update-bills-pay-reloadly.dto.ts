import { PartialType } from '@nestjs/mapped-types';
import { CreateBillsPayReloadlyDto } from './create-bills-pay-reloadly.dto';

export class UpdateBillsPayReloadlyDto extends PartialType(CreateBillsPayReloadlyDto) {}
