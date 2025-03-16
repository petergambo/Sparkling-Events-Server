import { PartialType } from '@nestjs/mapped-types';
import { CreateDataReloadlyDto } from './create-data-reloadly.dto';

export class UpdateDataReloadlyDto extends PartialType(CreateDataReloadlyDto) {}
