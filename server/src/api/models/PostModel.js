const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: []
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);
