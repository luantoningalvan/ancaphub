import { Request, Response } from 'express';
import AWS from 'aws-sdk';

class LibraryUploadController {
  public async show(request: Request, response: Response): Promise<Response> {
    const params = {
      Bucket: 'ancaphub',
      Key: 'my-awesome-object.webm',
      Expires: 30 * 60, // 30 minutes
      ContentType: 'video/webm',
    };
    const options = {
      signatureVersion: 'v4',
      region: 'us-east-1', // same as your bucket
      endpoint: new AWS.Endpoint('ancaphub.s3-accelerate.amazonaws.com'),
      useAccelerateEndpoint: true,
    };
    const client = new AWS.S3(options);
    const signedURL = await new Promise((resolve, reject) => {
      client.getSignedUrl('putObject', params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return response.json({
      signedURL,
    });
  }
}

export default LibraryUploadController;
