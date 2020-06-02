const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const databaseUrl = process.env.MONGO_URI;
module.exports = mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
