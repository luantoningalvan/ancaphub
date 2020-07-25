const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

// Sub-model for questions inside FAQ
const FrequentQuestion = new Schema({
  question: String,
  answer: String,
});

// Sub-model for links
const ProjectLink = new Schema({
  title: String,
  url: String,
});

// Sub-model for donation methods
const DonationMethod = new Schema({
  title: String,
  url: String,
  description: String,
});

// Main project model
const Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  links: {
    type: [ProjectLink],
    default: [],
  },
  faq: {
    type: [FrequentQuestion],
  },
  about: String,
  donation_methods: {
    type: [DonationMethod],
  },
  mantainers: {
    type: [ObjectId],
    ref: 'User',
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

const ProjectModel = model('Project', Project);

module.exports = ProjectModel;
