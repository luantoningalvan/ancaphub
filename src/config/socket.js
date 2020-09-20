const { Router } = require('express');
const socketio = require('socket.io');
const auth = require('../middlewares/auth');
const Chat = require('../models/ChatModel');
const Message = require('../models/MessageModel');

/**
 * Gets the socket server
 */
const getSocket = (server) => socketio(server);

const getSocketAttachedServer = (expressServer) => {
  // Create HTTP server from express instance
  // eslint-disable-next-line global-require
  const httpServer = require('http').Server(expressServer);

  // Attach WebSocket to HTTP
  const io = getSocket(httpServer);

  /**
   * Router for chats
   */
  const chatRoutes = Router();

  // Creates or returns a given chat if it exists, then joins it if the user is able to do so.
  chatRoutes.post('/:recipient', auth, async (req, res) => {
    // Get the recipient from the URL params
    const { recipient } = req.params;

    // Find or create the designated room
    let chat = await Chat.findOne({
      recipients: { $in: [req.user.id, recipient] },
    });

    if (!chat) {
      chat = await Chat.create({ recipients: [req.user.id, recipient] });
    }

    // Emit the event for processing the request via socket
    io.emit('room', chat.toObject());

    // Return plain HTTP 202
    return res.status(202).send(chat);
  });

  // Gets the chat information
  chatRoutes.get('/:chatId', auth, async (req, res) => {
    // Get chat ID from URL params
    const { chatId } = req.params;

    // Find the chat and check if the user and the recipient are there
    const chat = await Chat.findById(chatId);

    if (chat) {
      if (chat.recipients.includes(req.user.id)) {
        return res.send(chat);
      }

      return res.status(403).json({
        message: 'Unable to get a chat you are not participating in.',
      });
    }
    return res.status(404).json({ message: 'Chat not found' });
  });

  /**
   * Router for messages
   */
  const messageRoutes = Router();

  // Adds a new message to a given chat if user is able to do so.
  messageRoutes.post('/:chatId', auth, async (req, res) => {
    // Get chat ID from URL params
    const { chatId } = req.params;

    // And the recipient from the request body
    const { recipient, content } = req.body;

    // Find the chat and check if the user and the recipient are there
    const chat = await Chat.findById(chatId);

    if (chat) {
      if (
        chat.recipients.includes(req.user.id) &&
        chat.recipients.includes(recipient)
      ) {
        // Create message
        // Creates the message in the database
        const message = await Message.create({
          content,
          chat,
          user: req.user.id,
        });

        // Return data through socket
        io.emit('send-new-message', {
          content,
          chat: chatId,
          user: req.user.id,
        });

        // Return plain HTTP 201 with no body
        return res.status(201).send(message);
      }

      return res.status(403).json({
        message:
          'Either designated sender or recipient are not participating in this chat.',
      });
    }

    return res.status(404).json({ message: 'Chat not found' });
  });

  // Gets all messages from a given chat if user is able to to so.
  messageRoutes.get('/:chatId', auth, async (req, res) => {
    // Get the chat ID from the request params
    const { chatId } = req.params;

    // Find the chat and check if the user and the recipient are there
    const chat = await Chat.findById(chatId);

    if (chat) {
      if (chat.recipients.includes(req.user.id)) {
        // Find messages
        const messages = await Message.find({ chat: chatId });

        // Return the messages through socket (just in case something needs to be done live)
        io.emit('chat-messages', messages);

        // Return the messages via HTTP
        return res.send(messages);
      }

      return res.status(403).json({
        message:
          'Unable to get messages from a chat you are not participating in.',
      });
    }

    return res.status(404).json({ message: 'Chat not found' });
  });

  // Set port numbers
  const port = process.env.PORT || 3333;

  // Use routers within the express server
  expressServer.use('/api/chats', chatRoutes);
  expressServer.use('/api/messages', messageRoutes);

  // Listen on designated port
  httpServer.listen(port, () => {
    console.log(
      `AncapHub API + WebSocket rodando na porta ${port} (http://localhost:${port}/).`
    );
  });

  // Set socket events
  io.on('connection', (socket) => {
    socket.on('room', async (data) => {
      // Get information from request
      const { chat } = data;

      // Joins socket chat room
      socket.join(chat._id);

      // Emits event when user is connected
      socket.to(chat._id).broadcast.emit('find-or-create-room', chat);
    });

    socket.on('send-new-message', async (data) => {
      // Get information from request
      const { content, chat, user } = data;

      // Send new message event
      socket.to(chat).broadcast.emit('new-message', { content, chat, user });
    });
  });

  return expressServer;
};

module.exports = {
  getSocketAttachedServer,
};
