const File = require('../models/FileModel');

const insert = async (req, res) => {
  const { originalname, name, size, location: url = '' } = req.file;

  const post = await File.create({
    originalname,
    name,
    size,
    url
  });

  return res.json(post);
}

const get = async (req, res) => {
  try {
    const filesToLoad = JSON.parse(req.query['files']);
    const files = await File.find({ _id: { $in: filesToLoad } });
    res.status(200).send(files);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { insert, get };
