const Category = require('../models/CategoryModel');

const getManyCategories = async (filter) => {
  try {
    return await Category.find(filter).sort('title')
  } catch (e) {
    throw new Error(e.message)
  }
};

const getCategory = async (id) => {
  try {
    return await Category.findById(id)
  } catch (e) {
    throw new Error(e.message)
  }
};

const insertCategory = async (data) => {
  try {
    const category = new Category(data);
    return await category.save();
  } catch (e) {
    throw new Error(e.message)
  }
};

const updateCategory = async (id, data) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    return await category.save();
  } catch (e) {
    throw new Error(e.message)
  }
};

module.exports = { getManyCategories, getCategory, insertCategory, updateCategory }
