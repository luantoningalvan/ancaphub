const server = require('./config/server')
require("./config/database")

// Rotas
require("./api/routes/BookRoutes")(server)