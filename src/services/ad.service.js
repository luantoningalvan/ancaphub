const Ad = require('../models/Ad');

const getAllAds = async () => {
  const codes = await Ad.find();
  return codes;
};

const getRandomAd = async () => {
  const adsCount = await Ad.countDocuments();
  const random = Math.floor(Math.random() * adsCount);
  const ad = await Ad.findOne().skip(random);
  return ad;
};

const insertAdd = async (data) => {
  const ad = await Ad.create(data);
  return ad;
};

module.exports = {
  getAllAds,
  getRandomAd,
  insertAdd,
};
