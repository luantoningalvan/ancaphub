const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: String,
  type: {
    type: String,
    default: "pending",
    lowercase: true,
    enum: ['status', 'collection_item']
  },
  extraFields: Object,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: []
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);
