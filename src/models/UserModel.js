const mongoose = require('mongoose');

const { Schema } = mongoose;

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Array,
      required: true,
      default: ['user'],
    },
    name: {
      type: String,
    },
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    following: [],
    followers: [],
    birthday: Date,
    avatar: String,
    site: String,
    bio: String,
    currentCity: String,
    isVerified: { type: Boolean, default: false },
    geoLocation: { type: Boolean, default: false },
    lastLocation: {
      type: PointSchema,
      index: '2dsphere',
    },
    recoverCode: {
      active: { type: Boolean, default: false },
      code: { type: String },
    },
  },
  { timestamps: true }
);

UserSchema.index({ username: 'text' });

module.exports = mongoose.model('User', UserSchema);
