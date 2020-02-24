const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true},
  date: { type: Date, default: Date.now },
  likes: []
})

const PostSchema = new Schema({
  content: String,
  type: {
    type: String,
    default: "status",
    lowercase: true,
    enum: ['status', 'library_item']
  },
  extraFields: Object,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [],
  comments: [CommentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);
