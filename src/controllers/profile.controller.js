const {
  notificationService,
  profileService,
  libraryService,
  userService,
} = require('../services');

const { createNotification } = notificationService;
const {
  getFollowedUsers,
  getUserFollowers,
  followUser,
  unfollowUser,
} = profileService;
const { getManyItems } = libraryService;
const { getUser, getUserByHandle } = userService;
const verifyToken = require('../utils/verifyToken');

const getFollowers = async (req, res, next) => {
  const { handle } = req.params;

  try {
    const isAuthenticaded = verifyToken(req);
    const result = await getUserFollowers(handle, isAuthenticaded);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const getFollowing = async (req, res, next) => {
  const { handle } = req.params;

  try {
    const isAuthenticaded = verifyToken(req);
    const result = await getFollowedUsers(handle, isAuthenticaded);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const getLibrary = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isAutheticated = verifyToken(req);
    const user = await getUser(id, 'library');
    const result = await getManyItems(
      { filter: { _id: { $in: user.library } } },
      '',
      isAutheticated
    );
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const getContributions = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isAutheticated = verifyToken(req);
    const result = await getManyItems(
      { filter: { user: id } },
      '',
      isAutheticated
    );
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const follow = async (req, res, next) => {
  const { handle: followedHandle } = req.params;
  const { username: followerHandle, id } = req.user;

  try {
    const result = await followUser(followedHandle, followerHandle);

    // Get followed user in order to reach their ID
    const followed = await getUserByHandle(followedHandle);

    await createNotification({
      receiver: followed._id,
      sender: id,
      type: 'user_followed',
      data: {
        _id: result._id,
        username: result.username,
        avatar: result.avatar,
      },
    });

    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

const unfollow = async (req, res, next) => {
  console.log(req.user);
  const { handle: followedHandle } = req.params;
  const { username: followerHandle } = req.user;

  try {
    const result = await unfollowUser(followedHandle, followerHandle);
    res.send(result);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getFollowers,
  getFollowing,
  getLibrary,
  getContributions,
  follow,
  unfollow,
};
