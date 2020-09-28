/* eslint-disable consistent-return */
const { trendService } = require('../services');

const getAll = async (req, res) => {
  try {
    const trends = await trendService.getAll();
    return res.send(trends);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const trend = await trendService.getById(req.params.id);
    return res.send(trend);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const insert = async (req, res) => {
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
    return res.status(500).json({ error: e.message });
  }
};

const update = async (req, res) => {
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
    return res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await trendService.remove(id);
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const pin = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await trendService.pin(id);
    return res.send(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
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
