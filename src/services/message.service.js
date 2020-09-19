const Message = require('../models/MessageModel');

const getFromChat = async (chatId) => {
  try {
    const messages = await Message.find({ chat: chatId });

    return messages;
  } catch (e) {
    throw new Error(e.message);
  }
};

const get = async (id) => {
  try {
    const message = await Message.findById(id);

    return message;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getFromChat,
  get,
};
