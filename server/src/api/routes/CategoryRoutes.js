const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Category = require("../models/CategoryModel")

// @route 	GET api/categories
// @desc 	  Retorna uma lista de todos as categorias
// @access 	Public
router.get("/", async (request, response) => {
  try {
    var result = await Category.find().sort("title").exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/categories
// @desc 	  Cria uma nova categoria
// @access 	Private
router.post("/", auth, async (request, response) => {
  try {
    var category = new Category(request.body);
    var result = await category.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router
