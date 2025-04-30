/* eslint-disable prettier/prettier */
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
// import { promisify } from 'util';
// import * as fs from 'fs';

// Promisify unlink to delete file after upload
// const unlinkFile = promisify(fs.unlink);

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: 'dimqewtj6', 
  api_key: '549126674934155', 
  api_secret: '8I4bxqO3E-Z_XuN5TYP4_vxMLvk',
});


export async function uploadImageBufferToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse | undefined> {
  try {
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'SparklingEventsWebsiteImages',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as UploadApiResponse);
          }
        }
      ).end(file.buffer); // Pass the memory buffer here!
    });

    return uploadResult;
  } catch (error) {
    console.error('Upload error:', error);
  }
}

