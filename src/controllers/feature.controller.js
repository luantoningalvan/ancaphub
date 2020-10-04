const { featureService } = require('../services');

const {
  insert: insertFeature,
  update: updateFeature,
  remove: removeFeature,
  get: getFeature,
  index: indexFeatures,
} = featureService;

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await getFeature(id);

    return res.json(feature.toObject());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const index = async (req, res) => {
  try {
    const features = await indexFeatures();
    return res.json(features);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const insert = async (req, res) => {
  try {
    const { title, description, relevance, uri, picture } = req.body;
    const feature = await insertFeature({
      title,
      description,
      relevance,
      uri,
      picture,
    });
    return res.json(feature.toObject());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, description, relevance, uri, picture } = req.body;
    const feature = await updateFeature({
      title,
      description,
      relevance,
      uri,
      picture,
    });
    return res.json(feature.toObject());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await removeFeature(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  get,
  index,
  insert,
  update,
  remove,
};
