import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudinaryUploadDto } from './create-cloudinary-upload.dto';

export class UpdateCloudinaryUploadDto extends PartialType(CreateCloudinaryUploadDto) {}
