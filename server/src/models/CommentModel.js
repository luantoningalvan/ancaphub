const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true},
  date: { type: Date, default: Date.now },
  likes: []
})

module.exports = mongoose.model('Comment', CommentSchema);
