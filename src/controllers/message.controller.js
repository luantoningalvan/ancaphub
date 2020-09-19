/* eslint-disable consistent-return */
const { messageService } = require('../services');

const getFromChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const messages = await messageService.getFromChat(chatId);

    return res.send(messages);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await messageService.get(id);

    if (!message) {
      throw new Error('Message not found');
    }

    return res.send(message);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getFromChat,
  get,
};
