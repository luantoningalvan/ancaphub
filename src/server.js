require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const server = express();
const routes = require('./routes');
const { getSocketAttachedServer } = require('./config/socket');

const apiBaseUrl = process.env.API_BASE_URL || '/api';

const corsOptions = {
  optionsSuccessStatus: 200,
};

server.use(express.json({ extended: false }));
server.use(cors(corsOptions));
server.use(morgan('tiny'));
server.get('/', (req, res) => res.send('Bem vindo a API 1.0 do AncapHub'));
server.use(apiBaseUrl, routes);

server.use('/public', express.static('public'));

const serverWithSocket = getSocketAttachedServer(server);

module.exports = serverWithSocket;
