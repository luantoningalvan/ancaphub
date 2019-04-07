const restful = require('node-restful')
const mongoose = restful.mongoose

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    cover: {type: String},
    description: {type: String},
})

module.exports = restful.model('bookSchema', bookSchema)