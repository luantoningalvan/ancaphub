const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: String,
    cover: String,
    buyLinks: Array,
    avaliableFormats: {
        type: Array,
    },
    languages: Array
})

module.exports = mongoose.model('Book', BookSchema);