
const express = require('express')
const server = express()
const cors = require('cors')
require("./config/database")

const port = 3000
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  optionsSuccessStatus: 200
}

server.use(express.json({ extended: false }))
server.use(cors(corsOptions))


// Rotas
const books = require('./api/routes/BookRoutes')
const articles = require('./api/routes/ArticleRoutes')
const categories = require('./api/routes/CategoryRoutes')
const users = require('./api/routes/UsersRoutes')
const posts = require('./api/routes/PostsRoutes')
const upload = require('./api/routes/UploadRoutes')
const auth = require('./api/routes/AuthRoutes')

server.use('/api/books/', books)
server.use('/api/articles/', articles)
server.use('/api/categories/', categories)
server.use('/api/users/', users)
server.use('/api/posts/', posts)
server.use('/api/upload/', upload)
server.use('/api/auth/', auth)

server.use('/public', express.static('public'));

server.listen(port, function () {
  console.log(`BACKEND está rodando na porta ${port}.`)
})

module.exports = server
