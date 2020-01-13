const Post = require('../models/PostModel');
const User = require('../models/UserModel');

const getUserFeed = async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 10
  const currentPage = req.query.currentPage ? req.query.currentPage : 1

  try {
    const following = await User.findById(req.user.id);
    const filterQuery = { user: [...following.following, req.user.id] }
    const result = await Post.find(filterQuery)
      .populate('user', 'username id avatar')
      .sort({ createdAt: 'desc' })
      .limit(parseInt(pageSize))
      .skip(pageSize * currentPage - pageSize)
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const result = await Post.find({ user: req.params.id })
      .populate('user', 'username id avatar')
      .sort({ createdAt: 'desc' });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const insert = async (req, res) => {
  const { content } = req.body;
  try {
    var post = new Post({
      content,
      user: req.user.id
    });
    var result = await post.save();
    result = await result.populate('user', 'username id avatar').execPopulate();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.user == req.user.id) {
        post.remove();
        const result = post.save();
        res.send(result);
      } else {
        return res
          .status(400)
          .json({
            errors: [
              { msg: 'Você não tem autorização para excluir esta postagem' }
            ]
          });
      }
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Essa postagem não existe.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (post) {
      if (post.likes.includes(req.user.id)) {
        post.likes.pull(req.user.id);
      } else {
        post.likes.push(req.user.id);
      }

      var result = await post.save();
      res.send(result);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Essa postagem não existe.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (post) {
      if (post.likes.includes(req.user.id)) {
        post.likes.pull(req.user.id);
      } else {
        post.likes.push(req.user.id);
      }

      var result = await post.save();
      res.send(result);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Essa postagem não existe.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getUserFeed, getUserPosts, insert, remove, likePost, unlikePost };
