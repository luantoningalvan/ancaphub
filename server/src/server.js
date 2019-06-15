const port = 3000

require("./config/database")
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./config/cors')
const queryParser = require('express-query-int')
const passport = require("passport");

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

// Middleware do Passport 
server.use(passport.initialize());

// Configuração do Passport
require("./config/passport")(passport);

const books = require('./api/routes/BookRoutes')
const users = require('./api/routes/UserRoutes')

server.use('/api/books/', books)
server.use('/api/users/', users)

server.listen(port, function() {
    console.log(`BACKEND está rodando na porta ${port}.`)
})

module.exports = server