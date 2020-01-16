const Item = require("../models/LibraryModel")
const User = require("../models/UserModel")
const haversine = require('haversine');

const searchTerm = async (req, res) => {
  try {
    const items = await Item.find({ "$text": { "$search": req.body.query } }, "_id title type description cover author")
      .populate('cover')
    const users = await User.find({ "$text": { "$search": req.body.query } }, "_id username avatar")
    res.send({ items, users })
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
};

const searchNearbyUsers = async (req, res) => {
  try {
    const authUser = await User.findById(req.user.id);
    const allUsers = await User.find({
      geoLocation: true,
      _id: { $ne: authUser._id }
    });
    const lastLocation = authUser.lastLocation;
    const radius = req.query.radius;

    let nearbyUsers = [];

    for (let index = 0; index < allUsers.length; index++) {
      const distance = haversine(allUsers[index].lastLocation, lastLocation);

      if (distance <= radius) {
        const { _id, avatar, username } = allUsers[index];
        nearbyUsers.push({
          _id,
          avatar,
          username,
          distance: parseFloat(distance).toFixed(2)
        });
      }
    }

    res.send(nearbyUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { searchTerm, searchNearbyUsers }
