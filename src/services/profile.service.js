const User = require('../models/UserModel');
const userObject = require('../utils/userObject');

const getUserFollowers = async (id, isAuthenticated) => {
  try {
    const users = await User.findById(id, 'followers').populate('followers');

    return users.followers.map((user) => ({
      user: userObject(user, isAuthenticated),
    }));
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFollowedUsers = async (id, isAuthenticated) => {
  try {
    const users = await User.findById(id, 'following').populate('following');

    return users.following.map((user) => ({
      user: userObject(user, isAuthenticated),
    }));
  } catch (e) {
    throw new Error(e.message);
  }
};

const followUser = async (followedId, followerId) => {
  try {
    const followed = await User.findById(followedId);
    const follower = await User.findById(followerId);

    if (!followed) throw new Error('O usuário a ser seguido não existe.');

    if (follower.following.includes(followed)) {
      throw new Error(
        `O usuário @${followed.username} já é seguido por @${follower.username}`
      );
    }

    followed.followers.push(followerId);
    follower.following.push(followedId);

    await followed.save();
    await follower.save();

    return {
      _id: followedId,
      following: true,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const unfollowUser = async (followedId, followerId) => {
  try {
    const followed = await User.findById(followedId);
    const follower = await User.findById(followerId);

    if (!followed) throw new Error('O usuário a não ser seguido não existe.');

    if (follower.following.includes(followed)) {
      throw new Error(
        `O usuário @${followed.username} não é seguido por @${follower.username}`
      );
    }

    followed.followers.pull(followerId);
    follower.following.pull(followedId);

    await followed.save();
    await follower.save();

    return {
      _id: followedId,
      following: false,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getFollowedUsers,
  getUserFollowers,
  followUser,
  unfollowUser,
};
