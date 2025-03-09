import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminSettingDto } from './create-admin-setting.dto';

export class UpdateAdminSettingDto extends PartialType(CreateAdminSettingDto) {}
