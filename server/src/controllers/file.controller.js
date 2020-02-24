const { fileService } = require('../services')
const { getManyFiles, uploadToS3 } = fileService
const fs = require('fs')

const insert = async (req, res, next) => {
  try {
    const fileContent = fs.createReadStream(req.file.path);
    const result = await uploadToS3(req.file, fileContent)
    res.status(200).json(result);
    next()
  } catch (e) {
    next(e)
  }
}

const get = async (req, res, next) => {
  try {
    const filesToLoad = JSON.parse(req.query['files']);
    const result = await getManyFiles(filesToLoad)
    res.status(200).send(result);
    next()
  } catch (e) {
    next(e)
  }
};

module.exports = { insert, get };
