const Category = require('../models/CategoryModel');

const getAll = async (req, res) => {
  try {
    const result = await Category.find().sort('title')
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const result = await Category.findById(req.params.id)
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const insert = async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    var result = await category.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, get, insert, update }
