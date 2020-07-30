const verifyToken = require('../utils/verifyToken');
const service = require('../services/projectPost.service');
const projectService = require('../services/project.service');

const getAll = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const data = await service.getAllProjectPosts(projectId);
    res.send(data);
    next();
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const post = await service.getProjectPost(req.params.postId);

    if (!post) throw new Error('Post not found');

    const auth = verifyToken(req);
    const { id } = auth;

    if (id) {
      // Check whether project is managed by current user
      const projectObj = {
        ...post.toObject(),
        isAuthor: id === post.author.toHexString(),
      };

      // Send new object with admin boolean information
      res.send(projectObj);
    }

    // Else send only the plain project document
    res.send(post);
    next();
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { title, content } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (
      !project.mantainers.includes(userId) &&
      project.createdBy.toHexString() !== userId
    ) {
      throw new Error('You have no permission to create a post.');
    }

    const post = await service.addProjectPost({
      author: userId,
      project: projectId,
      title,
      content,
    });
    res.send(post);
    next();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const project = await projectService.getProject(projectId);
    const post = await service.getProjectPost(postId);

    if (!post) throw new Error('Post not found');

    if (
      project.createdBy.toHexString() !== userId &&
      post.author.toHexString() !== userId
    ) {
      throw new Error('You have no permission to modify this post.');
    }

    const updated = await service.updateProjectPost(postId, {
      title,
      content,
    });
    res.send(updated);
    next();
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId, postId } = req.params;

  try {
    const project = await projectService.getProject(projectId);
    const post = await service.getProjectPost(postId);

    if (!post) throw new Error('Post not found');

    if (
      project.createdBy.toHexString() !== userId &&
      post.author.toHexString() !== userId
    ) {
      throw new Error('You have no permission to delete this post.');
    }

    await service.deleteProjectPost(postId);
    res.status(204).send();
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getOne,
  insert,
  update,
  remove,
};
