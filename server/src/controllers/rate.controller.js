const { notificationService, rateService, libraryService } = require('../services')
const { createNotification } = notificationService
const { getRate, createRate } = rateService
const { getItem, updateItem } = libraryService

const get = async (req, res) => {
  const { id } = req.params
  try {
    const result = getRate(id)
    res.send(result.rates);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const insert = async (req, res, next) => {
  try {
    // Rate
    const rateData = new Rate({
      item: req.body.item,
      user: req.user.id,
      value: req.body.value,
      comment: req.body.comment
    })
    const rate = await createRate(rateData)

    // Item
    const item = await getItem(req.body.item)
    const updateItemData = {
      rateCount: item.rateCount + 1,
      rateValue: item.rateValue + rate.value,
      rateAverage: (item.rateValue + rate.value) / (item.rateCount + 1)
    }
    await updateItem(updateItemData)

    // Notification
    await createNotification({
      sender: rate.user,
      receiver: item.user,
      type: 'rated_item',
      data: {
        _id: item._id,
        title: item.title,
        type: item.type
      }
    })

    res.send(rate);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

module.exports = { get, insert }
