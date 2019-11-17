const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Event = require('../models/EventModel');

// @route 	GET api/events
// @desc 	  Retorna uma lista de todos os eventos
// @access 	Public
router.get('/', async (request, response) => {
  try {
    const result = await Event.find().sort('createdAt')
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/events
// @desc 	  Cria um novo evento
// @access 	Private
router.post('/', auth, async (request, response) => {
  try {
    var event = new Event(request.body);
    var result = await event.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/events/:id
// @desc 	  Edita um evento existente
// @access 	Private
router.put('/:id', auth, async (request, response) => {
  try {
    var event = await Event.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    var result = await event.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});


// @route 	DELETE api/events/:id
// @desc 	  Exclui um evento existente
// @access 	Private
router.delete('/:id', auth, async (request, response) => {
  try {
    const result = await Event.findByIdAndRemove(request.params.id);
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
