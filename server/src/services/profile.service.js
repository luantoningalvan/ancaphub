const User = require('../models/UserModel')

const getUserFollowers = async (id) => {
  try {
    return await User
      .findById(id, 'followers')
      .populate('followers', 'username avatar _id');
  } catch (e) {
    throw new Error(e.message)
  }
}

const getFollowedUsers = async (id) => {
  try {
    return await User
      .findById(id, 'following')
      .populate('following', 'username avatar _id');
  } catch (e) {
    throw new Error(e.message)
  }
}

const getUserCollection = async (id) => {
  try {
    return await User
      .findById(id, 'personalCollection')
      .populate({
        path: 'personalCollection',
        model: 'Item',
        populate: { path: 'cover', model: 'File' }
      });
  } catch (e) {
    throw new Error(e.message)
  }
}

const getUserContributions = async (id) => {
  try {
    return await Item
      .find({ user: id, status: 'published' })
      .populate('cover');
  } catch (e) {
    throw new Error(e.message)
  }
}

const followUser = async (followedId, followerId) => {
  try {
    const followed = await User.findById(followedId);
    const follower = await User.findById(followerId);

    if (!followed) throw new Error('O usuário a ser seguido não existe.')

    if (follower.following.includes(followed)) {
      throw new Error(`O usuário @${followed.username} já é seguido por @${follower.username}`)
    }

    followed.followers.push(followerId);
    follower.following.push(followedId);

    await follower.save();
    return await followed.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

const unfollowUser = async (followedId, followerId) => {
  try {
    const followed = await User.findById(followedId);
    const follower = await User.findById(followerId);

    if (!followed) throw new Error('O usuário a não ser seguido não existe.')

    if (follower.following.includes(followed)) {
      throw new Error(`O usuário @${followed.username} não é seguido por @${follower.username}`)
    }

    followed.followers.pull(followerId);
    follower.following.pull(followedId);

    await follower.save();
    return await followed.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getFollowedUsers, getUserFollowers, getUserContributions, getUserCollection, followUser, unfollowUser }