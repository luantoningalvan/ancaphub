const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  options: [],
  allVotes: []
}, { timestamps: true })

module.exports = mongoose.model('Poll', PollSchema);
