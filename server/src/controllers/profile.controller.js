const { notificationService, profileService } = require('../services')
const { createNotification } = notificationService
const { getFollowedUsers, getUserFollowers, getUserContributions, getUserCollection, followUser, unfollowUser } = profileService

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
    const result = await getUserCollection(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const getContributions = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await getUserContributions(id)
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