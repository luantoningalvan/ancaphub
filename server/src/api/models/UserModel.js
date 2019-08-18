const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Array,
    required: true,
    default: ['user']
  },
  personalCollection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  following: [],
  followers: [],
  birthday: Date,
  avatar: String,
  site: String,
  bio: String,
  location: String
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);