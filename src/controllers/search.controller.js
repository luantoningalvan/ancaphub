const { userService, searchService } = require('../services');

const { updateUser, getUsersByDistance } = userService;
const verifyToken = require('../utils/verifyToken');
const userObject = require('../utils/userObject');

const searchTerm = async (req, res, next) => {
  try {
    const { page, pageSize, term } = req.query;

    const results = await searchService.globalSearch(
      term,
      page || 1,
      pageSize || 10
    );

    res.send(results);

    next();
  } catch (e) {
    next(e);
  }
};

const searchMentionUsers = async (req, res, next) => {
  const { term, page, pageSize } = req.query;

  try {
    const results = await searchService.mentionSearch(
      term,
      page || 1,
      pageSize || 10
    );

    res.send(results);
    next();
  } catch (e) {
    next(e);
  }
};

const searchNearbyUsers = async (req, res, next) => {
  const { longitude, latitude } = req.body.lastLocation;
  const lastLocation = [longitude, latitude];
  const radius = req.body.radius * 1000;
  const isAutheticated = verifyToken(req);

  try {
    const authUser = await updateUser(req.user.id, {
      type: 'Point',
      coordinates: lastLocation,
    });
    const users = await getUsersByDistance(authUser._id, radius, lastLocation);

    const result = users.map((user) => ({
      user: {
        ...userObject(user, isAutheticated),
        dist: user.dist,
      },
    }));

    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = { searchTerm, searchMentionUsers, searchNearbyUsers };
