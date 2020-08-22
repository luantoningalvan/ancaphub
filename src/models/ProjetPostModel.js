const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectPostSchema = new Schema(
  {
    title: String,
    content: String,
    thumbnail: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProjectPost', ProjectPostSchema);
