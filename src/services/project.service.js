const isEqual = require('lodash.isequal');

const Project = require('../models/ProjectModel');

const getAllProjects = async (user) => {
  let allProjects = await Project.find().sort('createdAt');

  if (user) {
    allProjects = allProjects.map((project) => ({
      ...project.toObject(),
      isAdmin: user === project.createdBy.toHexString(),
      isFollowing: project.followers.includes(user),
    }));
  }

  return allProjects;
};

const getProject = async (id, user) => {
  let project = await Project.findById(id);

  if (user) {
    project = {
      ...project.toObject(),
      isAdmin: user === project.createdBy.toHexString(),
      isFollowing: project.followers.includes(user),
    };
  }

  return project;
};

const addProject = async (data) => Project.create(data);

const updateProject = async (id, data, user) => {
  const project = await Project.findById(id);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(user)))
    throw new Error('Unauthorized action');

  return Project.findByIdAndUpdate(id, data, { new: true });
};

const deleteProject = async (id, author) => {
  const project = await Project.findById(id);
  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(author)))
    throw new Error('Unauthorized action');

  return project.remove();
};

const addProjectFAQ = async (data, projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  project.faq.push(data);

  return project.save();
};

const removeProjectFAQ = async (questionId, projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  project.faq.pull(questionId);

  return project.save();
};

const addProjectDonation = async (data, projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  project.donation_methods.push(data);

  return project.save();
};

const removeProjectDonation = async (donationId, projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(userId)))
    throw new Error('Unauthorized action');

  project.donation_methods.pull(donationId);

  return project.save();
};

const followProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) throw new Error('Esse projeto não existe!');

  if (project.followers.includes(userId)) {
    project.followers.pull(userId);
    await project.save();
    return {
      _id: project._id,
      isFollowing: false,
    };
  }

  project.followers.push(userId);
  await project.save();

  return {
    _id: project._id,
    isFollowing: true,
  };
};

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
  addProjectFAQ,
  removeProjectFAQ,
  addProjectDonation,
  removeProjectDonation,
  followProject,
};
