const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuoteSchema = new Schema({
  quote: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  authorPic: { type: String },
});

module.exports = mongoose.model('Quote', QuoteSchema);
