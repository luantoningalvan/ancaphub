const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Item = require("../models/CollectionItemModel")
const Rate = require("../models/RateModel")
const Notification = require("../models/NotificationModel")

// @route 	GET api/rates
// @desc 	Retorna uma lista de todos as avaliações de um item
// @access 	Public
router.get("/:id", async (request, response) => {
  try {
    var result = await Rate.find({ item: request.params.id }).populate("user", "_id name avatar").sort("createdAt");
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/rates
// @desc 	Cria uma nova avaliação
// @access 	Private
router.post("/", auth, async (request, response) => {
  try {
    const rate = new Rate({
      item: request.body.item,
      user: request.user.id,
      value: request.body.value,
      comment: request.body.comment
    })

    const item = await Item.findById(request.body.item)

    const updateItem = {
      rateCount: item.rateCount + 1,
      rateValue: item.rateValue + rate.value,
      rateAverage: (item.rateValue + rate.value) / (item.rateCount + 1)
    }

    const notify = new Notification({
      sender: rate.user,
      receiver: item.user,
      type: 'rated_item',
      data: {
        _id: item._id,
        title: item.title
      }
    });

    await item.update(updateItem)
    await rate.save();
    await notify.save();
    await rate.populate('user', 'name _id avatar').execPopulate()
    response.send(rate);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router
