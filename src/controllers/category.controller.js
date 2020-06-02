const { categoryService } = require('../services');

const {
  getManyCategories,
  getCategory,
  insertCategory,
  updateCategory,
  removeCategory,
} = categoryService;

const getAll = async (req, res, next) => {
  try {
    const result = await getManyCategories();
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await getCategory(id);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await insertCategory(data);
    res.status(201).send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await updateCategory(id, data);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await removeCategory(id);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove,
};
