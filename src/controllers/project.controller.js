const jimp = require('jimp');
const fs = require('fs');
const verifyToken = require('../utils/verifyToken');

const service = require('../services/project.service');
const { uploadToS3 } = require('../services/file.service');

const getAll = async (req, res) => {
  try {
    const auth = verifyToken(req);
    const { id: userId } = auth;

    const data = await service.getAllProjects(userId);
    return res.send(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getOne = async (req, res) => {
  try {
    const auth = verifyToken(req);
    const { id: userId } = auth;
    const { id: projectId } = req.params;

    const project = await service.getProject(projectId, userId);

    return res.send(project);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const insert = async (req, res) => {
  try {
    const project = await service.addProject({
      createdBy: req.user.id,
      ...req.body,
    });
    return res.send(project);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const update = async (req, res) => {
  const { id: userId } = req.user;
  const { id: projectId } = req.params;
  const { title, description, category, links } = req.body;

  try {
    const updated = await service.updateProject(
      projectId,
      { title, description, category, links },
      userId
    );
    return res.send(updated);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: projectId } = req.params;

    const removed = await service.deleteProject(projectId, userId);
    return res.send(removed);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

/* PROJECT ABOUT */
const updateAbout = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { about } = req.body;

  try {
    const updated = await service.updateProject(projectId, { about }, userId);
    res.send(updated);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

/* PROJECT FAQ */
const addFAQ = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { answer, question } = req.body;

  const faq = await service.addProjectFAQ(
    { answer, question },
    projectId,
    userId
  );

  res.send(faq);
};

const removeFAQ = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId, questionId } = req.params;

  const faq = await service.removeProjectFAQ(questionId, projectId, userId);

  res.send(faq);
};

/* PROJECT DONATIONS */
const addDonation = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { type, title, description } = req.body;

  const donation = await service.addProjectDonation(
    { type, title, description },
    projectId,
    userId
  );

  res.send(donation);
};

const removeDonation = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId, donationId } = req.params;

  const donation = await service.removeProjectDonation(
    donationId,
    projectId,
    userId
  );

  res.send(donation);
};

/* PROJECT AVATAR */
const updateAvatar = async (req, res) => {
  // Get the updated project ID
  const { projectId } = req.params;
  const { id: userId } = req.user;

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
        const project = await service.updateProject(
          projectId,
          {
            avatar: upload.url,
          },
          userId
        );

        res.send(project);
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const removeAvatar = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { id: userId } = req.user;

    const project = await service.updateProject(
      projectId,
      {
        avatar: null,
      },
      userId
    );

    return res.send(project);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

/* PROJECT COVER */
const updateCover = async (req, res) => {
  // Get the updated project ID
  const { projectId } = req.params;
  const { id: userId } = req.user;

  try {
    // Read the sent avatar file
    const cover = await jimp.read(req.file.path);

    // Get cropping information from the data field
    const crop = JSON.parse(req.body.data);

    const { x, y, width, height } = crop.croppedAreaPixels;

    // Process the picture
    cover
      .quality(80)
      .crop(x, y, width, height)
      .resize(1200, 400)
      .write(`./public/uploads/projects/cover/${req.file.name}`, async () => {
        // Get file contents
        const content = fs.createReadStream(
          `./public/uploads/projects/cover/${req.file.name}`
        );

        // Upload to Amazon S3
        const upload = await uploadToS3(req.file, content);

        // Update project entity
        const project = await service.updateProject(
          projectId,
          {
            cover: upload.url,
          },
          userId
        );

        return res.send(project);
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const removeCover = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { id: userId } = req.user;

    const project = await service.updateProject(
      projectId,
      {
        cover: null,
      },
      userId
    );

    return res.send(project);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const followProject = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;

  try {
    const result = await service.followProject(projectId, userId);

    return res.send(result);
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
  updateAbout,
  addFAQ,
  removeFAQ,
  addDonation,
  removeDonation,
  updateAvatar,
  removeAvatar,
  updateCover,
  removeCover,
  followProject,
};
