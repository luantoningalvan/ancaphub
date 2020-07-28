const jimp = require('jimp');
const fs = require('fs');
const verifyToken = require('../utils/verifyToken');

const service = require('../services/project.service');
const { uploadToS3 } = require('../services/file.service');

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

    const auth = verifyToken(req);
    const { id } = auth;

    if (id) {
      // Check whether project is managed by current user
      const projectObj = {
        ...project.toObject(),
        isAdmin: id === project.createdBy.toHexString(),
      };

      // Send new object with admin boolean information
      res.send(projectObj);
    }

    // Else send only the plain project document
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

/**
 * Updates the avatar for a given project using its ID as an argument.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateAvatar = async (req, res, next) => {
  // Get the updated project ID
  const { projectId } = req.params;

  try {
    // Read the sent avatar file
    const avatar = await jimp.read(req.file.path);

    // Get cropping information from the data field
    const crop = JSON.parse(req.body.data);

    const { x, y, width, height } = crop.croppedAreaPixels;

    // Process the picture
    avatar
      .quality(60)
      .crop(x, y, width, height)
      .resize(256, 256)
      .write(`./public/uploads/projects/avatar/${req.file.name}`, async () => {
        // Get file contents
        const content = fs.createReadStream(
          `./public/uploads/projects/avatar/${req.file.name}`
        );

        // Upload to Amazon S3
        const upload = await uploadToS3(req.file, content);

        // Update project entity
        const project = await service.updateProject(projectId, {
          avatar: upload._id,
        });

        res.send(project);
      });
  } catch (e) {
    next(e);
  }
};

/**
 * Updates the cover picture for a given project using its ID as an argument.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateCoverPicture = async (req, res, next) => {
  // Get the updated project ID
  const { projectId } = req.params;

  try {
    // Read the sent avatar file
    const cover = await jimp.read(req.file.path);

    // Get cropping information from the data field
    const crop = JSON.parse(req.body.data);

    const { x, y, width, height } = crop.croppedAreaPixels;

    // Process the picture
    cover
      .quality(60)
      .crop(x, y, width, height)
      .resize(1024, 300)
      .write(`./public/uploads/projects/cover/${req.file.name}`, async () => {
        // Get file contents
        const content = fs.createReadStream(
          `./public/uploads/projects/cover/${req.file.name}`
        );

        // Upload to Amazon S3
        const upload = await uploadToS3(req.file, content);

        // Update project entity
        const project = await service.updateProject(projectId, {
          cover: upload._id,
        });

        res.send(project);
      });
  } catch (e) {
    next(e);
  }
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
  updateAvatar,
  updateCoverPicture,
};
