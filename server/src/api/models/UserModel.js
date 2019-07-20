const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
})

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
  library: [ItemSchema],
  watchLater: { ItemSchema },
  birthday: Date,
  avatar: String
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);