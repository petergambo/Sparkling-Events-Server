/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { Prisma } from '@prisma/client';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() createPackageDto: Prisma.PackageCreateInput) {
    return this.packageService.create(createPackageDto);
  }

  @Post('create-subpackage')
  createSubItem(@Body() createPackageDto: Prisma.PackageBundleCreateInput) {
    return this.packageService.createSubPackage(createPackageDto);
  }

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get('package-items/:packageName')
  findSubPackages(@Param('packageName') packageName: string) {
    return this.packageService.findPackageItems(packageName);
  }

  @Get('get-by-subpackage-id/:subPackageId')
  findSubPackageId(@Param('subPackageId') subPackageId: string) {
    return this.packageService.findBySubPackageId(subPackageId);
  }

  @Get('get-by-subpackage-name/:subPackageName')
  findSubPackageName(@Param('subPackageName') subPackageName: string) {
    return this.packageService.findBySubPackageName(subPackageName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: Prisma.PackageUpdateInput) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Patch('subpackage/:id')
  updateSubPackage(@Param('id') id: string, @Body() updatePackageDto: Prisma.PackageBundleUpdateInput) {
    return this.packageService.updateSubPackage(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }
}
