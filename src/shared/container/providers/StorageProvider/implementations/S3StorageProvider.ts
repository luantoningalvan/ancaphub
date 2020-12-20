import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import Jimp from 'jimp';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3();
  }

  public async saveFile(file: string, crop?: any): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const { x, y, w, h } = crop;

    const fileContentWithCompression = await Jimp.read(originalPath).then(
      async (image) => {
        image.quality(60);
        image.crop(x, y, w, h);
        image.resize(256, 256);

        return image.getBufferAsync(Jimp.AUTO);
      }
    );

    await this.client
      .putObject({
        Bucket: 'ancaphub',
        Key: file,
        ACL: 'public-read',
        Body: fileContentWithCompression,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'ancaphub',
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
