const express = require('express');

const app = express();

app.listen(3333, () => {
  console.log('Sevidor rodando na porta 3333');
});
