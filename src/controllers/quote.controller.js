/* eslint-disable consistent-return */
const fs = require('fs');
const { fileService, quoteService } = require('../services');

const { uploadToS3 } = fileService;

const getAll = async (req, res, next) => {
  try {
    const quotes = await quoteService.getAll();
    return res.send(quotes);
  } catch (e) {
    next(e);
  }
};

const getQuoteOfDay = async (req, res, next) => {
  try {
    const ad = await quoteService.getQuoteOfDay();
    return res.send(ad);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const { quote, author, date } = req.body;
  try {
    const fileContent = await fs.createReadStream(req.file.path);
    const upload = await uploadToS3(req.file, fileContent);

    const result = await quoteService.insertQuote({
      quote,
      date,
      author,
      authorPic: upload.url,
    });
    return res.send(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await quoteService.removeQuote(id);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getQuoteOfDay,
  insert,
  remove,
};