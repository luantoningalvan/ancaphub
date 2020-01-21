const { notificationService, profileService, libraryService, userService } = require('../services')
const { createNotification } = notificationService
const { getFollowedUsers, getUserFollowers, followUser, unfollowUser } = profileService
const { getManyItems } = libraryService
const { getUser } = userService
const verifyToken = require('../utils/verifyToken')

const getFollowers = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await getUserFollowers(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const getFollowing = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await getFollowedUsers(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const getCollection = async (req, res, next) => {
  const { id } = req.params

  try {
    const isAutheticated = verifyToken(req)
    const user = await getUser(id, "personalCollection")
    const result = await getManyItems({filter: { '_id': {$in: user.personalCollection}}}, "", isAutheticated)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const getContributions = async (req, res, next) => {
  const { id } = req.params

  try {
    const isAutheticated = verifyToken(req)
    const result = await getManyItems({filter: { 'user': id }}, "", isAutheticated)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const follow = async (req, res, next) => {
  const { id: followedId } = req.params;
  const { id: followerId } = req.user;

  try {
    const result = await followUser(followedId, followerId)

    await createNotification({
      receiver: followedId,
      sender: followerId,
      type: 'user_followed',
      data: {
        _id: result._id,
        username: result.username,
        avatar: result.avatar
      }
    })

    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const unfollow = async (req, res, next) => {
  const { id: followedId } = req.params;
  const { id: followerId } = req.user;

  try {
    const result = await unfollowUser(followedId, followerId)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

module.exports = { getFollowers, getFollowing, getCollection, getContributions, follow, unfollow }