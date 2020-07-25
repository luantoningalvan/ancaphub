const service = require('../services/project.service');

const getAll = async (req, res, next) => {
  try {
    const data = await service.getAllProjects();
    res.send(data);
    next();
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const project = await service.getProject(req.params.id);
    res.send(project);
    next();
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  try {
    const project = await service.addProject({
      createdBy: req.user.id,
      ...req.body,
    });
    res.send(project);
    next();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.user;
  const { id: projectId } = req.params;

  try {
    const project = await service.getProject(projectId);

    if (
      project.mantainers.includes(id) ||
      project.createdBy.toHexString() === id
    ) {
      const updated = await service.updateProject(projectId, req.body);
      res.send(updated);
      next();
    }
  } catch (e) {
    next(e);
  }

  res
    .status(403)
    .send({ error: 'You have no permission to modify this project.' });

  next();
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: projectId } = req.params;

    const project = await service.getProject(projectId);

    if (project.createdBy.toHexString() === id) {
      const removed = await service.deleteProject(projectId);
      res.send(removed);
      next();
    }
  } catch (e) {
    next(e);
  }

  res
    .status(403)
    .send({ error: 'You have no permission to delete this project.' });

  next();
};

module.exports = {
  getAll,
  getOne,
  insert,
  update,
  remove,
};
