const port = 3000

require("./config/database")
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('cors')
const queryParser = require('express-query-int')
const passport = require("passport");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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
const users = require('./api/routes/UserRoutes')

server.use('/api/books/', books)
server.use('/api/users/', users)

server.post('/upload', upload.single('cover'), function (req, res, next) {
  console.log(req.file)
})

server.listen(port, function() {
    console.log(`BACKEND está rodando na porta ${port}.`)
})

module.exports = server
