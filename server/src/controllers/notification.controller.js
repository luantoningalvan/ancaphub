const { notificationService } = require('../services')
const { getManyNotifications, updateMany } = notificationService

const getAll = async (req, res, next) => {
  try {
    const result = await getManyNotifications({ filter: { receiver: req.user.id } }, req.user)
    res.status(200).send(result)
    next()
  } catch (e) {
    next(e)
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    const result = await updateMany({ target: {receiver: req.user.id}, operation: { $push: { read_by: { readerId: req.user.id } }}})
    res.status(200).send(result)
    next()
  } catch (e) {
    next(e)
  }
};

module.exports = { getAll, markAllAsRead }