const { Schema, model } = require('mongoose');

const FeatureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  picture: String,
  uri: {
    type: String,
    required: true,
  },
  relevance: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // Maior é mais relevância
    default: 1, // Por padrão a relevância é 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d',
  },
});

const FeatureModel = model('Feature', FeatureSchema);

module.exports = FeatureModel;
