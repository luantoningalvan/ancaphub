const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: { type: mongoose.Schema.Types.ObjectId },
  name: String
})

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: String,
    cover: String,
    categories: [CategorySchema]
})

module.exports = mongoose.model('Article', BookSchema);
