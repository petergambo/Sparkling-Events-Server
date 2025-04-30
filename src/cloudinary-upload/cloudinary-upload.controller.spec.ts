import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryUploadController } from './cloudinary-upload.controller';
import { CloudinaryUploadService } from './cloudinary-upload.service';

describe('CloudinaryUploadController', () => {
  let controller: CloudinaryUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudinaryUploadController],
      providers: [CloudinaryUploadService],
    }).compile();

    controller = module.get<CloudinaryUploadController>(CloudinaryUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
