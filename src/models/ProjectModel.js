const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

// Sub-model for questions inside FAQ
const FrequentQuestion = new Schema({
  question: String,
  answer: String,
});

// Sub-model for donation methods
const DonationMethod = new Schema({
  type: String,
  title: String,
  description: String,
});

// Main project model
const Project = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    links: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
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
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    avatar: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

// Static method for getting the number of followers for a given project
Project.statics.getFollowerCount = async function () {
  return this.model('User').countDocuments({
    followedProjects: { $in: this._id },
  });
};

const ProjectModel = model('Project', Project);

module.exports = ProjectModel;
