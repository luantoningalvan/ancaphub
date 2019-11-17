const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const File = require('../models/FileModel');
const multer = require('multer');
const multerConfig = require('../../config/multer');

// @route 	POST api/categories
// @desc 	Envia um arquivo para o servidor
// @access 	Private
router.post(
  '/',
  auth,
  multer(multerConfig).single('file'),
  async (request, response) => {
    const { originalname, name, size, location: url = '' } = request.file;
    console.log(request.file);
    const post = await File.create({
      originalname,
      name,
      size,
      url
    });

    return response.json(post);
  }
);

router.get('/', async (request, response) => {
  try {
    const filesToLoad = JSON.parse(request.query['files']);
    const files = await File.find({ _id: { $in: filesToLoad } });
    response.status(200).send(files);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
