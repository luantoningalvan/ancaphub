const isEqual = require('lodash.isequal');
const ProjectPost = require('../models/ProjetPostModel');
const Project = require('../models/ProjectModel');

const getAllProjectPosts = async (projectId) =>
  ProjectPost.find({ project: projectId })
    .sort([['createdAt', -1]])
    .populate('project', '_id name avatar');

const getProjectPost = async (id) =>
  ProjectPost.findById(id).populate('project', '_id name avatar');

const addProjectPost = async (projectId, userId, data) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  return ProjectPost.create(data);
};

const updateProjectPost = async (postId, projectId, userId, data) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  return ProjectPost.findByIdAndUpdate(postId, data, { new: true });
};

const deleteProjectPost = async (projectId, userId, postId) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  return ProjectPost.findByIdAndRemove(postId);
};

module.exports = {
  getAllProjectPosts,
  getProjectPost,
  addProjectPost,
  updateProjectPost,
  deleteProjectPost,
};
