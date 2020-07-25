const Project = require('../models/ProjectModel');

const getAllProjects = async () => Project.find({});

const getProject = async (id) => Project.findById(id);

const addProject = async (data) => Project.create(data);

const updateProject = async (id, data) => Project.findByIdAndUpdate(id, data);

const deleteProject = async (id) => Project.findByIdAndRemove(id);

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
