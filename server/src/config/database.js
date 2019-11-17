var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const databaseUrl = process.env.MONGO_URI || 'mongodb://localhost/ancaphub';
module.exports = mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
