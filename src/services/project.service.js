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
  console.log(user);
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

const addProjectFAQ = async (id, data) => {
  const project = await Project.findById(id);

  project.faq.push(data);

  return project.save();
};

const removeProjectFAQ = async (id, data) => {
  const project = await Project.findById(id);

  project.faq.pull(data);

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
};
