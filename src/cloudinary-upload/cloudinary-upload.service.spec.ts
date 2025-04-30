import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryUploadService } from './cloudinary-upload.service';

describe('CloudinaryUploadService', () => {
  let service: CloudinaryUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryUploadService],
    }).compile();

    service = module.get<CloudinaryUploadService>(CloudinaryUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
