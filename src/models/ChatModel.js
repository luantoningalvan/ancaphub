const { Schema, model } = require('mongoose');

const ChatModel = new Schema(
  {
    recipients: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model('Chat', ChatModel);

module.exports = Chat;
