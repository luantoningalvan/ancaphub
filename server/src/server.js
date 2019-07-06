const port = 3000

require("./config/database")
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('cors')
const queryParser = require('express-query-int')
const passport = require("passport");

var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  optionsSuccessStatus: 200
}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors(corsOptions))
server.use(queryParser())

// Middleware do Passport
server.use(passport.initialize());

// Configuração do Passport
require("./config/passport")(passport);

const books = require('./api/routes/BookRoutes')
const articles = require('./api/routes/ArticleRoutes')
const categories = require('./api/routes/CategoryRoutes')
const users = require('./api/routes/UserRoutes')
const auth = require('./api/routes/AuthRoutes')

server.use('/api/books/', books)
server.use('/api/articles/', articles)
server.use('/api/categories/', categories)
server.use('/api/users/', users)
server.use('/api/auth/', auth)

server.listen(port, function() {
  console.log(`BACKEND está rodando na porta ${port}.`)
})

module.exports = server
