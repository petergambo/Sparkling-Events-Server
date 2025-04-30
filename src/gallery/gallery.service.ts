/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GalleryService {
  constructor(private readonly databaseService: DatabaseService){}
  
  create(createGalleryDto: Prisma.GalleryCreateInput) {
    return this.databaseService.gallery.create({data: createGalleryDto});
  }

  findAll() {
    return this.databaseService.gallery.findMany({orderBy:{createdAt:'desc'}});
  }

  findOne(id: string) {
    return this.databaseService.gallery.findFirst({where:{id}});
  }

  update(id: string, updateGalleryDto: Prisma.GalleryUpdateInput) {
    return this.databaseService.gallery.update({
      where:{id},
      data: updateGalleryDto
    });
  }

  remove(id: string) {
    return this.databaseService.gallery.delete({where: {id}})
  }
}
