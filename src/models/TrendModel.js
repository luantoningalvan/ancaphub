const { Schema, model } = require('mongoose');

/**
 * Modelo para os trends do portal.
 */
const Trend = new Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  description: String,
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  uri: String, // URI externa apontando para o recurso original
  sourceName: String, // Exemplo: nome do site de onde vem o conteúdo
  createdAt: {
    type: Date,
    expires: '7d', // Trends expiram em 7 dias no máximo
    default: Date.now,
  },
  pinned: Boolean,
});

module.exports = model('Trend', Trend);
