const fs = require('fs');
const verifyToken = require('../utils/verifyToken');
const service = require('../services/projectPost.service');
const { fileService } = require('../services');

const { uploadToS3 } = fileService;

const getAll = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const data = await service.getAllProjectPosts(projectId);
    res.send(data);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
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
        isAuthor: id === post.author._id.toHexString(),
      };

      // Send new object with admin boolean information
      res.send(projectObj);
    }

    // Else send only the plain project document
    res.send(post);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const insert = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { title, content } = req.body;

  try {
    const fileContent = fs.createReadStream(req.file.path);
    const upload = await uploadToS3(req.file, fileContent);
    const post = await service.addProjectPost(projectId, userId, {
      author: userId,
      project: projectId,
      thumbnail: upload.url,
      title,
      content,
    });
    res.send(post);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const update = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const updated = await service.updateProjectPost(postId, projectId, userId, {
      title,
      content,
    });
    res.send(updated);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId, postId } = req.params;

  try {
    await service.deleteProjectPost(projectId, userId, postId);
    res.status(204).send();
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAll,
  getOne,
  insert,
  update,
  remove,
};
