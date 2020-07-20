const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  banner: { type: String, required: true },
});

module.exports = mongoose.model('Ad', AdSchema);
