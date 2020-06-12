const User = require('../models/UserModel');
const userObject = require('../utils/userObject');

const getUserFollowers = async (handle, isAuthenticated) => {
  try {
    const users = await User.findOne(
      { username: handle },
      'followers'
    ).populate('followers');

    return users.followers.map((user) => ({
      user: userObject(user, isAuthenticated),
    }));
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFollowedUsers = async (handle, isAuthenticated) => {
  try {
    const users = await User.findOne(
      { username: handle },
      'following'
    ).populate('following');

    return users.following.map((user) => ({
      user: userObject(user, isAuthenticated),
    }));
  } catch (e) {
    throw new Error(e.message);
  }
};

const followUser = async (followedHandle, followerHandle) => {
  try {
    const followed = await User.findOne({ username: followedHandle });
    const follower = await User.findOne({ username: followerHandle });

    if (!followed) throw new Error('O usuário a ser seguido não existe.');

    if (follower.following.includes(followed)) {
      throw new Error(
        `O usuário @${followed.username} já é seguido por @${follower.username}`
      );
    }

    followed.followers.push(follower._id);
    follower.following.push(followed._id);

    await followed.save();
    await follower.save();

    return {
      _id: followed._id,
      following: true,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const unfollowUser = async (followedHandle, followerHandle) => {
  try {
    const followed = await User.findOne({ username: followedHandle });
    const follower = await User.findOne({ username: followerHandle });

    if (!followed) throw new Error('O usuário a não ser seguido não existe.');

    if (follower.following.includes(followed)) {
      throw new Error(
        `O usuário @${followed.username} não é seguido por @${follower.username}`
      );
    }

    followed.followers.pull(follower._id);
    follower.following.pull(followed._id);

    await followed.save();
    await follower.save();

    return {
      _id: followed._id,
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
