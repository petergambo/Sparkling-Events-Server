import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminSettingsService } from './admin-settings.service';
import { CreateAdminSettingDto } from './dto/create-admin-setting.dto';
import { UpdateAdminSettingDto } from './dto/update-admin-setting.dto';

@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly adminSettingsService: AdminSettingsService) {}

  @Post()
  create(@Body() createAdminSettingDto: CreateAdminSettingDto) {
    return this.adminSettingsService.create(createAdminSettingDto);
  }

  @Get()
  findAll() {
    return this.adminSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminSettingDto: UpdateAdminSettingDto) {
    return this.adminSettingsService.update(+id, updateAdminSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminSettingsService.remove(+id);
  }
}
