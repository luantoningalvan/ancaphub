require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const socket = require('socket.io');

// Models managed in socket connections
const Chat = require('./models/ChatModel');
const Message = require('./models/MessageModel');

const server = express();
const routes = require('./routes');

const port = process.env.PORT || 3333;
const apiBaseUrl = process.env.API_BASE_URL || '/api';

const corsOptions = {
  optionsSuccessStatus: 200,
};

server.use(express.json({ extended: false }));
server.use(cors(corsOptions));
server.use(morgan('tiny'));
server.get('/', (req, res) => res.send('Bem vindo a API 1.0 do AncapHub'));
server.use(apiBaseUrl, routes);

server.use(function (err, req, res) {
  res.status(500).json({ message: err.message });
});

server.use('/public', express.static('public'));

const http = server.listen(port, function () {
  console.log(
    `BACKEND está rodando na porta ${port}.`,
    `http://localhost:${port}/`
  );
});

// Socket.io setup for real time communication
const io = socket(http);

// Connection events
io.on('connection', (ws) => {
  ws.on('new chat', async (data) => {
    const { recipients, title, group } = data;

    // Create new chat
    const chat = await Chat.create({ recipients, title, group });

    // Pass data to listener in client side
    io.emit('new chat', chat.toObject());
  });

  ws.on('new message', async (data) => {
    const { content, chat, replyingTo } = data;

    // Create new message
    const message = await Message.create({ content, chat, replyingTo });

    // Pass data to listener in client side
    io.emit('new message', message.toObject());
  });
});

module.exports = server;
