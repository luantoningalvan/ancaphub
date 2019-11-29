require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');
const server = express();

const port = process.env.PORT || 3000;
const corsOptions = {
  optionsSuccessStatus: 200
};

server.use(express.json({ extended: false }));
server.use(cors(corsOptions));

// Rotas
const items = require('./api/routes/ItemRoutes');
const rates = require('./api/routes/RateRoutes');
const categories = require('./api/routes/CategoryRoutes');
const users = require('./api/routes/UsersRoutes');
const posts = require('./api/routes/PostsRoutes');
const file = require('./api/routes/FileRoutes');
const auth = require('./api/routes/AuthRoutes');
const notification = require('./api/routes/NotificationRoutes');
const events = require('./api/routes/EventRoutes');
const groups = require('./api/routes/GroupRoutes');

server.use('/api/items/', items);
server.use('/api/rates/', rates);
server.use('/api/categories/', categories);
server.use('/api/users/', users);
server.use('/api/posts/', posts);
server.use('/api/upload/', file);
server.use('/api/auth/', auth);
server.use('/api/events/', events);
server.use('/api/groups/', groups);
server.use('/api/notifications/', notification);

server.use('/public', express.static('public'));

server.listen(port, function () {
  console.log(`BACKEND está rodando na porta ${port}.`);
});

module.exports = server;
