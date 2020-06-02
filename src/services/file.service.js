const AWS = require('aws-sdk');
const File = require('../models/FileModel');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  endpoint:
    process.env.NODE_ENV === 'development'
      ? process.env.LOCALSTACK_URL
      : undefined,
});

const insertFile = async (data) => {
  try {
    return await File.create(data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFile = async (id) => {
  try {
    return await File.findById(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const uploadToS3 = async (file, fileContent) => {
  const params = {
    Bucket: process.env.BUCKET_NAME || 'ancaphub',
    Key: file.name,
    Body: fileContent,
    ContentEncoding: 'base64',
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return await insertFile({
      originalname: file.originalname,
      name: file.name,
      size: file.size,
      url: data.Location,
    });
  } catch (s3Err) {
    throw new Error(s3Err);
  }
};

const getManyFiles = async (filesToLoad) => {
  try {
    return await File.find({ _id: { $in: filesToLoad } });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  insertFile,
  getFile,
  getManyFiles,
  uploadToS3,
};
