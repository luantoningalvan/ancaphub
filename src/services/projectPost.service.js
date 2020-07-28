const ProjectPost = require('../models/ProjetPostModel');

const getAllProjectsPosts = async () => ProjectPost.find({});

const getProjectPost = async (id) => ProjectPost.findById(id);

const addProjectPost = async (data) => ProjectPost.create(data);

const updateProjectPost = async (id, data) =>
  ProjectPost.findByIdAndUpdate(id, data, { new: true });

const deleteProjectPost = async (id) => ProjectPost.findByIdAndRemove(id);

module.exports = {
  getAllProjectsPosts,
  getProjectPost,
  addProjectPost,
  updateProjectPost,
  deleteProjectPost,
};
