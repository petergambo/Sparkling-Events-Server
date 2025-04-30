import { Injectable } from '@nestjs/common';
import { CreateCloudinaryUploadDto } from './dto/create-cloudinary-upload.dto';
import { UpdateCloudinaryUploadDto } from './dto/update-cloudinary-upload.dto';

@Injectable()
export class CloudinaryUploadService {
  create(createCloudinaryUploadDto: CreateCloudinaryUploadDto) {
    return 'This action adds a new cloudinaryUpload';
  }

  findAll() {
    return `This action returns all cloudinaryUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloudinaryUpload`;
  }

  update(id: number, updateCloudinaryUploadDto: UpdateCloudinaryUploadDto) {
    return `This action updates a #${id} cloudinaryUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloudinaryUpload`;
  }
}
