import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    old_public_id?: string,
  ): Promise<CloudinaryResponse> {
    console.log({ file: file.size });

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      if (file.size > 1000000) {
        throw new Error('Please upload a file size not more than 1M');
      } else {
        if (old_public_id) {
          this.deleteFile(old_public_id);
        }
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            console.log({ error, result });

            if (error) return reject(error);
            resolve(result);
          },
        );
        console.log({ uploadStream });

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      }
    });
  }
  async deleteFile(public_id: string): Promise<any> {
    const response = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,
      resource_type: 'image',
    });
    console.log(response);

    return response;
  }
}

/**
  async uploadImage(
    filename: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // Check if the size of the file is more than 1M
    if (filename.size > 1000000) {
      throw new Error('Please upload a file size not more than 1M');
    }
    // Check if the file is an image
    if (!filename.mimetype.startsWith('image')) {
      throw new Error('Sorry, this file is not an image, please try again');
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'profileImage' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(filename.buffer).pipe(upload);
    });
 */
