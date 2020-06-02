const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    content: String,
    cover: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    type: String,
    status: {
      type: String,
      default: 'pending',
      lowercase: true,
      enum: ['published', 'pending', 'waiting', 'rejected', 'draft'],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    extraFields: Object,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    collectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rateCount: { type: Number, default: 0 },
    rateValue: { type: Number, default: 0 },
    rateAverage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ItemSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Item', ItemSchema);
