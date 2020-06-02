const { libraryService, userService } = require('../services')
const { getManyItems, saveItem } = libraryService
const { getUser } = userService

const getAll = async (req, res, next) => {
    const { id } = req.user
  
    try {
      const user = await getUser(id, 'saved')
      const result = await getManyItems({filter: { '_id': {$in: user.saved}}}, "", req.user)
      res.send(result);
      next()
    } catch (e) {
      next(e)
    }
  }
  
  const insert = async (req, res, next) => {
    const { item } = req.body;
    const { id: user } = req.user;
  
    try {
      const result = await saveItem(user, item)
      res.json(result);
      next()
    } catch (e) {
      next(e)
    }
  }

  module.exports = { getAll, insert }