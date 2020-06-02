const mongoose = require('mongoose');

const { Schema } = mongoose;

const PollSchema = new Schema(
  {
    options: [],
    allVotes: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poll', PollSchema);
