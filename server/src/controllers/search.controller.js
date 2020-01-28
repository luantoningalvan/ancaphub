const { userService, libraryService } = require('../services')
const { getManyUsers, getUser } = userService
const { getManyItems } = libraryService
const verifyToken = require('../utils/verifyToken')

const searchTerm = async (req, res, next) => {
  try {
    const isAutheticated = verifyToken(req)
    const items = await getManyItems({ filter: { $text: { $search: req.body.query } } }, "", isAutheticated)
    const users = await getManyUsers({ filter: { $text: { $search: req.body.query } } }, "", isAutheticated)

    res.send({ items, users })
    next()
  } catch (e) {
    next(e)
  }
};

const searchNearbyUsers = async (req, res, next) => {
  const authUser = await getUser(req.user.id, "lastLocation")
  const lastLocation = authUser.lastLocation.coordinates
  const radius = req.query.radius * 1000

  try {
    const result = await getManyUsers({
      filter: {
        _id: { $ne: authUser._id },
        geoLocation: true,
        lastLocation: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: lastLocation
            },
            $maxDistance: radius
          }
        }
      }
    })

    res.send(result)
    next()
  } catch (e) {
    next(e)
  }
};
module.exports = { searchTerm, searchNearbyUsers }
