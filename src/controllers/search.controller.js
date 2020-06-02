const { userService, libraryService } = require('../services')
const { getManyUsers, getUser, updateUser, getUsersByDistance } = userService
const { getManyItems } = libraryService
const verifyToken = require('../utils/verifyToken')
const userObject = require("../utils/userObject")

const searchTerm = async (req, res, next) => {
  try {
    const isAutheticated = verifyToken(req)
    const items = await getManyItems({ filter: { $text: { $search: req.body.query } } }, "", isAutheticated)
    const users = await getManyUsers({ filter: { $text: { $search: req.body.query } } })

    res.send({ 
      items, 
      users: users.map(user => ({
        user: userObject(user, isAutheticated)
      })) 
    })
    next()
  } catch (e) {
    next(e)
  }
};

const searchNearbyUsers = async (req, res, next) => {
  const { longitude, latitude} = req.body.lastLocation
  const lastLocation = [longitude, latitude]
  const radius = req.body.radius * 1000
  const isAutheticated = verifyToken(req)

  try {
    const authUser = await updateUser(req.user.id, { type: "Point", coordinates:lastLocation })
    const users = await getUsersByDistance(authUser._id, radius, lastLocation)

    console.log(users)
    const result = users.map(user => ({
      user: {
        ...userObject(user, isAutheticated),
        dist: user.dist
      }
    })) 

    res.send(result)
    next()
  } catch (e) {
    console.log(e)
    next(e)
  }
};
module.exports = { searchTerm, searchNearbyUsers }
