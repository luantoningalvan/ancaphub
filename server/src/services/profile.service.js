const User = require('../models/UserModel')

const getUserFollowers = async (id) => {
  try {
    return await User
      .findById(id, 'followers')
      .populate('followers', 'name username avatar _id isVerified');
  } catch (e) {
    throw new Error(e.message)
  }
}

const getFollowedUsers = async (id) => {
  try {
    return await User
      .findById(id, 'following')
      .populate('following', 'name username avatar _id isVerified');
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

    await followed.save();
    const result = await follower.save()
    return result.following
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


    await followed.save();
    const result = await follower.save()
    return result.following
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getFollowedUsers, getUserFollowers, followUser, unfollowUser }