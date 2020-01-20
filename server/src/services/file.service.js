const File = require('../models/FileModel');

const insertFile = async (data) => {
  try {
    return await File.create(data);
  } catch (e) {
    throw new Error(e.message)
  }
}

const getFile = async (id) => {
  try {
    return await File.findById(id);
  } catch (e) {
    throw new Error(e.message)
  }
};


const getManyFiles = async (filesToLoad) => {
  try {
    return await File.find({ _id: { $in: filesToLoad } });
  } catch (e) {
    throw new Error(e.message)
  }
};

module.exports = { insertFile, getFile, getManyFiles };
