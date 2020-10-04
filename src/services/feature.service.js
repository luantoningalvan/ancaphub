const Feature = require('../models/FeatureModel');

const insert = async ({ title, description, picture, uri, relevance }) => {
  const feature = await Feature.create({
    title,
    description,
    picture,
    uri,
    relevance,
  });
  return feature;
};

const update = async (id, { title, description, picture, uri, relevance }) => {
  const feature = await Feature.findByIdAndUpdate(id, {
    title,
    description,
    picture,
    uri,
    relevance,
  });

  if (!feature) throw new Error('Destaque não encontrado');

  return feature;
};

const remove = async (id) => {
  const feature = await Feature.findByIdAndRemove(id);

  if (!feature) throw new Error('Destaque não encontrado');

  return feature;
};

const get = async (id) => {
  const feature = await Feature.findById(id);

  if (!feature) throw new Error('Destaque não encontrado');

  return feature;
};

const index = async () => {
  const features = await Feature.find().sort({ createdAt: -1 }).limit(5);
  return features;
};

module.exports = {
  insert,
  update,
  remove,
  get,
  index,
};
