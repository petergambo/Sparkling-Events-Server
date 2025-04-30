/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Prisma } from '@prisma/client';

@Controller('gallery')
export class GalleryController {
  
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  create(@Body() createGalleryDto: Prisma.GalleryCreateInput) {
    return this.galleryService.create(createGalleryDto);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: Prisma.GalleryUpdateInput) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
