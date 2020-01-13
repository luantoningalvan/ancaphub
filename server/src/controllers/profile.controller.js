const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const Item = require('../models/CollectionItemModel');
const File = require('../models/FileModel');
const Notification = require('../models/NotificationModel')

const getFollowers = async (req, res) => {
  try {
    var result = await User.findById(request.params.id, 'followers').populate(
      'followers',
      'username avatar _id'
    );
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getFollowing = async (req, res) => {
  try {
    var result = await User.findById(request.params.id, 'following').populate(
      'following',
      'username avatar _id'
    );
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getCollection = async (req, res) => {
  try {
    var result = await User.findById(
      request.params.id,
      'personalCollection'
    ).populate({
      path: 'personalCollection',
      model: 'Item',
      populate: { path: 'cover', model: 'File' }
    });
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getContributions = async (req, res) => {
  try {
    var result = await Item.find({
      user: request.params.id,
      status: 'published'
    }).populate('cover');

    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

const followUser = async (req, res) => {
  const { id } = request.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(request.user.id);
    if (userFollowed) {
      if (userFollowed.followers.includes(request.user.id)) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.push(request.user.id);
      follower.following.push(id);


      await userFollowed.save();
      var result = await follower.save();
      response.send(result.following);

      const notify = new Notification({
        receiver: userFollowed._id,
        sender: follower._id,
        type: 'user_followed',
        data: {
          _id: userFollowed._id,
          username: userFollowed.username,
          avatar: userFollowed.avatar
        }
      });

      await notify.save();
    } else {
      return response
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
};

const unfollowUser = async (req, res) => {
  const { id } = request.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(request.user.id);
    if (userFollowed) {
      if (!userFollowed.followers.includes(request.user.id)) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.pull(request.user.id);
      follower.following.pull(id);
      await userFollowed.save();
      var result = await follower.save();
      response.send(result.following);
    } else {
      return response
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = { getFollowers, getFollowing, getCollection, getContributions, followUser, unfollowUser }