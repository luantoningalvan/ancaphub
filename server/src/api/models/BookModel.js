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
    downloadOptions: {
        type: Array,
        required: true
    },
    languages: Array
})

module.exports = mongoose.model('Book', BookSchema);