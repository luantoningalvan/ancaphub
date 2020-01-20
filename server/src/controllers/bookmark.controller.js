const User = require('../models/UserModel');
const { libraryService } = require('../services')
const { getManyItems, saveItem } = libraryService


const getAll = async (req, res, next) => {
    const { id } = req.user
  
    try {
      const user = await User.findById(id, 'saved')
      const result = await getManyItems({filter: { '_id': {$in: user.saved}}}, "", req.user)
      res.send(result);
      next()
    } catch (e) {
      res.sendStatus(500) && next(e)
    }
  }
  
  const insert = async (req, res, next) => {
    const { item } = req.body;''
    const { id: user } = req.user;
  
    try {
      const result = await saveItem(user, item)
      res.json(result);
      next()
    } catch (e) {
      res.sendStatus(500) && next(e)
    }
  }

  module.exports = { getAll, insert }