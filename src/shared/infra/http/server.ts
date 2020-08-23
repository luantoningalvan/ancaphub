import express from 'express';

const app = express();
const port = process.env.port || 3333;

app.get('/', (req, res) => {
  res.send('Working');
});

app.listen(3333, () => {
  console.log(`Server started on port ${port}`);
});
