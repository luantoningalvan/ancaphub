const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    name: String,
    originalname: String,
    size: Number,
    url: String,
  },
  { timestamps: true }
);

FileSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${
      process.env.BASE_URL || 'http://localhost:3000'
    }/public/uploads/${this.name}`;
  }
});

module.exports = mongoose.model('File', FileSchema);
