const File = require('../models/FileModel');

const insertFile = async (data) => {
  try {
    return await File.create(data);
  } catch (e) {
    throw new Error(e.message)
  }
}

const getFiles = async (filesToLoad) => {
  try {
    return await File.find({ _id: { $in: filesToLoad } });
  } catch (e) {
    throw new Error(e.message)
  }
};

module.exports = { insertFile, getFiles };
