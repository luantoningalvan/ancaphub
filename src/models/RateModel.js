const mongoose = require('mongoose');

const { Schema } = mongoose;

const RateSchema = new Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: Number,
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rate', RateSchema);
