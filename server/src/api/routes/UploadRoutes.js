const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const path = require("path");
var multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, "file-" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

// @route 	POST api/categories
// @desc 	Envia um arquivo para o servidor
// @access 	Private
router.post("/", auth, upload.single('file'), async (request, response) => {
  response.status(200).send(request.file.filename)
});

module.exports = router
