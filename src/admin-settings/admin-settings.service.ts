import { Injectable } from '@nestjs/common';
import { CreateAdminSettingDto } from './dto/create-admin-setting.dto';
import { UpdateAdminSettingDto } from './dto/update-admin-setting.dto';

@Injectable()
export class AdminSettingsService {
  create(createAdminSettingDto: CreateAdminSettingDto) {
    return 'This action adds a new adminSetting';
  }

  findAll() {
    return `This action returns all adminSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminSetting`;
  }

  update(id: number, updateAdminSettingDto: UpdateAdminSettingDto) {
    return `This action updates a #${id} adminSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminSetting`;
  }
}
