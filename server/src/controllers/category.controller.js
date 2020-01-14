const { categoryService } = require('../services')
const { getManyCategories, getCategory, insertCategory, updateCategory } = categoryService

const getAll = async (req, res) => {
  try {
    const result = await getManyCategories()
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const get = async (req, res) => {
  const id = req.params.id

  try {
    const result = await getCategory(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const insert = async (req, res) => {
  const data = req.body

  try {
    const result = await insertCategory(data);
    res.status(201).send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const update = async (req, res) => {
  const id = req.params.id
  const data = req.body

  try {
    var result = await updateCategory(id, data);
    res.send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

module.exports = { getAll, get, insert, update }
