import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadUrl(url: string): Promise<CloudinaryResponse>{
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(url, { "tags": "basic_sample", "width": 200, "height": 200, "crop": "scale"},
          (error, result) => {
            if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }   
}