const ProjectPost = require('../models/ProjetPostModel');

const getAllProjectPosts = async (projectId) =>
  ProjectPost.find({ project: projectId });

const getProjectPost = async (id) => ProjectPost.findById(id);

const addProjectPost = async (data) => ProjectPost.create(data);

const updateProjectPost = async (id, data) =>
  ProjectPost.findByIdAndUpdate(id, data, { new: true });

const deleteProjectPost = async (id) => ProjectPost.findByIdAndRemove(id);

module.exports = {
  getAllProjectPosts,
  getProjectPost,
  addProjectPost,
  updateProjectPost,
  deleteProjectPost,
};
