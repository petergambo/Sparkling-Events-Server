import { Module } from '@nestjs/common';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import { CloudinaryUploadController } from './cloudinary-upload.controller';

@Module({
  controllers: [CloudinaryUploadController],
  providers: [CloudinaryUploadService],
})
export class CloudinaryUploadModule {}
