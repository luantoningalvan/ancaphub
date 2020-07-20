/* eslint-disable consistent-return */
const fs = require('fs');

const { fileService, adService } = require('../services');

const { uploadToS3 } = fileService;

const getAll = async (req, res, next) => {
  try {
    const ads = await adService.getAllAds();
    res.send(ads);
    return next();
  } catch (e) {
    next(e);
  }
};

const getRandom = async (req, res, next) => {
  try {
    const ad = await adService.getRandomAd();
    res.send(ad);
    return next();
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const { title, link } = req.body;
  try {
    const fileContent = fs.createReadStream(req.file.path);
    const upload = await uploadToS3(req.file, fileContent);

    const ad = await adService.insertAdd({
      title,
      link,
      banner: upload.url,
    });
    res.send(ad);
    next();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getRandom,
  insert,
};
