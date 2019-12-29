const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Item = require("../models/CollectionItemModel")
const User = require("../models/UserModel")

// @route 	POST api/search
// @desc 	  Busca por um termo
// @access 	Public
router.post("/", async (request, response) => {
  try {
    const items = await Item.find({"$text": { "$search": request.body.query}}, "_id title type description cover author")
    .populate('cover')
    const users = await User.find({"$text": { "$search": request.body.query}}, "_id username avatar")
    response.send({items, users})
  } catch (error) {
    console.log(error)
    response.status(400).send(error)
  }
});

module.exports = router
