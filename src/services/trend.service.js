const Trend = require('../models/TrendModel');

/**
 * Busca todos os documentos ativos de trends.
 * Nunca serão mais antigos que 7 dias.
 */
const getAll = async () => {
  return Trend.find({}).sort({ createdAt: -1 });
};

/**
 * Busca um trend pela sua ID.
 */
const getById = async (id) => {
  const trend = await Trend.findById(id);

  if (trend) {
    return trend;
  }

  throw new Error('Trend não encontrado.');
};

/**
 * Busca um trend seguindo algum critério de busca.
 */
const getOne = async (query) => {
  return Trend.findOne(query);
};

const insert = async (data) => {
  return Trend.create(data);
};

const update = async (id, data) => {
  const trend = await Trend.findById(id);

  if (trend) {
    await trend.update(data);
    await trend.save();
    return trend;
  }

  throw new Error('Trend não encontrado.');
};

const remove = async (id) => {
  const trend = await Trend.findById(id);

  if (trend) {
    await trend.deleteOne();
    return trend;
  }

  throw new Error('Trend não encontrado.');
};

const pin = async (id) => {
  const trend = await Trend.findById(id);

  if (!trend) throw new Error('Trend não encontrado');

  if (trend.pinned) {
    return Trend.findByIdAndUpdate(id, { pinned: false }, { new: true });
  }

  const findPinned = await Trend.findOne({ pinned: true });

  if (findPinned) {
    await findPinned.update({ pinned: false });
  }

  return Trend.findByIdAndUpdate(id, { pinned: true }, { new: true });
};

module.exports = {
  getAll,
  getById,
  getOne,
  insert,
  update,
  remove,
  pin,
};
