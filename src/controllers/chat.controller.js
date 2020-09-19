/* eslint-disable consistent-return */
const { chatService } = require('../services');

const getAll = async (req, res, next) => {
  try {
    const chats = await chatService.getAll(req.body.recipients);
    return res.send(chats);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const chat = await chatService.get(req.params.id);

    if (!chat) throw new Error('Chat not found');

    return res.send(chat);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  get,
};
