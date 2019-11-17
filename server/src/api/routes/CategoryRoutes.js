const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Category = require('../models/CategoryModel');

// @route 	GET api/categories
// @desc 	  Retorna uma lista de todos as categorias
// @access 	Public
router.get('/', async (request, response) => {
  try {
    var result = await Category.find()
      .sort('title')
      .exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/categories
// @desc 	  Cria uma nova categoria
// @access 	Private
router.post('/', auth, admin, async (request, response) => {
  try {
    var category = new Category(request.body);
    var result = await category.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/categories/:id
// @desc 	  Edita uma categoria existente
// @access 	Private
router.put('/:id', auth, admin, async (request, response) => {
  try {
    var category = await Category.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    var result = await category.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
