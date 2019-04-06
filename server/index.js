const express = require('express');
const server = express()

server.get('/', function(req, res){
  res.send('Coé putedo')
})

server.listen(3000, () => console.log('Tudo certo'))