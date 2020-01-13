const User = require('../models/UserModel');
const Item = require('../models/CollectionItemModel');

// Services
const { notificationService } = require('../services')
const { createNotification } = notificationService

const getFollowers = async (req, res) => {
  try {
    var result = await User.findById(req.params.id, 'followers').populate(
      'followers',
      'username avatar _id'
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getFollowing = async (req, res) => {
  try {
    var result = await User.findById(req.params.id, 'following').populate(
      'following',
      'username avatar _id'
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCollection = async (req, res) => {
  try {
    var result = await User.findById(
      req.params.id,
      'personalCollection'
    ).populate({
      path: 'personalCollection',
      model: 'Item',
      populate: { path: 'cover', model: 'File' }
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getContributions = async (req, res) => {
  try {
    var result = await Item.find({
      user: req.params.id,
      status: 'published'
    }).populate('cover');

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const followUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(req.user.id);
    if (userFollowed) {
      if (userFollowed.followers.includes(req.user.id)) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.push(req.user.id);
      follower.following.push(id);


      await userFollowed.save();
      var result = await follower.save();
      res.send(result.following);

      await createNotification({
        receiver: userFollowed._id,
        sender: follower._id,
        type: 'user_followed',
        data: {
          _id: userFollowed._id,
          username: userFollowed.username,
          avatar: userFollowed.avatar
        }
      })

    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error);
  }
};

const unfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(req.user.id);
    if (userFollowed) {
      if (!userFollowed.followers.includes(req.user.id)) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.pull(req.user.id);
      follower.following.pull(id);
      await userFollowed.save();
      var result = await follower.save();
      res.send(result.following);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getFollowers, getFollowing, getCollection, getContributions, followUser, unfollowUser }