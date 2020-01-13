const Item = require("../models/CollectionItemModel")
const Rate = require("../models/RateModel")
const Notification = require("../models/NotificationModel")

const get = async (req, res) => {
  try {
    var result = await Rate.find({ item: req.params.id }).populate("user", "_id username avatar").sort("createdAt");
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const insert = async (req, res) => {
  try {
    const rate = new Rate({
      item: req.body.item,
      user: req.user.id,
      value: req.body.value,
      comment: req.body.comment
    })

    const item = await Item.findById(req.body.item)

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
    await rate.populate('user', 'username _id avatar').execPopulate()
    res.send(rate);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { get, insert }
