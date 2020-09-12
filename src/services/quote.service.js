const Quote = require('../models/QuoteModel');

const getAll = async () => {
  return Quote.find();
};

const getQuoteOfDay = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const quote = await Quote.findOne({
    date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
      2,
      '0'
    )}`,
  });
  return quote;
};

const insertQuote = async (data) => {
  const find = await Quote.findOne({ date: data.date });
  if (find !== null) throw new Error('Já existe uma frase para esse dia');

  return Quote.create(data);
};

module.exports = {
  getAll,
  getQuoteOfDay,
  insertQuote,
};
