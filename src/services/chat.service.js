const Chat = require('../models/ChatModel');

const getAll = async (ids) => {
  try {
    const chats = await Chat.find({ recipients: { $in: ids } });
    return chats;
  } catch (e) {
    throw new Error(e.message);
  }
};

const get = async (id) => {
  try {
    const chat = await Chat.findById(id);

    return chat;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAll,
  get,
};
