const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  children: Array
})

module.exports = mongoose.model('Category', CategorySchema);
