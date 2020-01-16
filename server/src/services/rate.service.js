const Rate = require("../models/RateModel")

const getRate = async (id) => {
  try {
    return await Rate.find({ item: id })
      .populate("user", "_id username avatar")
      .sort("createdAt");
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertRate = async (data) => {
  try {
    const rate = new Rate(data)
    await rate.save();
    return await rate
      .populate('user', 'username _id avatar')
      .execPopulate()
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getRate, insertRate }
