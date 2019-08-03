const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: { type: mongoose.Schema.Types.ObjectId },
    name: String
})

const ItemSchema = new Schema({
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
    type: String,
    extraFields: Object,
    categories: [CategorySchema],
    collectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Item', ItemSchema);
