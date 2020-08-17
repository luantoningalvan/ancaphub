const isEqual = require('lodash.isequal');

const Project = require('../models/ProjectModel');

const getAllProjects = async () => Project.find({});

const getProject = async (id, user) => {
  let project = await Project.findById(id);

  if (user) {
    project = {
      ...project.toObject(),
      isAdmin: user === project.createdBy.toHexString(),
    };
  }

  return project;
};

const addProject = async (data) => Project.create(data);

const updateProject = async (id, data, user) => {
  const project = await Project.findById(id);

  if (!isEqual(JSON.stringify(project.createdBy), JSON.stringify(user)))
    throw new Error('Unauthorized action');

  return project.update(data, { new: true });
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
};
