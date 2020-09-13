/* eslint-disable consistent-return */
const { trendService } = require('../services');

const getAll = async (req, res, next) => {
  try {
    const trends = await trendService.getAll();
    return res.send(trends);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const trend = await trendService.getById(req.params.id);
    return res.send(trend);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const { title, description, category, uri, picture, sourceName } = req.body;

  try {
    const trend = await trendService.insert({
      title,
      description,
      category,
      uri,
      picture,
      sourceName,
    });

    return res.send(trend);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { title, description, category, uri, picture, sourceName } = req.body;
  const { id } = req.params;

  try {
    const trend = await trendService.update(id, {
      title,
      description,
      category,
      uri,
      picture,
      sourceName,
    });

    return res.send(trend);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await trendService.remove(id);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const pin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await trendService.pin(id);
    return res.send(response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
  pin,
};
