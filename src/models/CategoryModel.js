const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CategorySchema = new Schema({
  name: { type: String, required: true},
  slug: String,
  children: Array
})

CategorySchema.pre('save', function() {
  if (!this.slug) {
    this.slug = slugify(this.name)
  }
});


module.exports = mongoose.model('Category', CategorySchema);
