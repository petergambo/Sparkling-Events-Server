/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImageBufferToCloudinary } from 'src/utils/cloudinary';

@Controller('upload')
export class CloudinaryUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await uploadImageBufferToCloudinary(file);
    return result;
  }
}
