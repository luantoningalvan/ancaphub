const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    replyingTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

const Message = model('Message', MessageSchema);

module.exports = Message;
