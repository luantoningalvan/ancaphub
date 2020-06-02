const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccessCodeSchema = new Schema(
  {
    code: String,
    used: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AccessCode', AccessCodeSchema);
