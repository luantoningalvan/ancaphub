const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  title: String,
  description: String,
  cover: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  private: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

module.exports = mongoose.model('Group', GroupSchema);
