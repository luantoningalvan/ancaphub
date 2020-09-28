const { commentService } = require('../services');

const {
  insertComment,
  removeComment,
  editComment,
  likeComment,
  replyComment,
} = commentService;

const insert = async (req, res, next) => {
  const { postId } = req.params;
  const data = {
    user: req.user.id,
    content: req.body.content,
  };

  try {
    const result = await insertComment(postId, data);
    res.send({
      _id: result._id,
      comments: result.comments,
    });
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const remove = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  try {
    const result = await removeComment(commentId, userId);
    res.send(result);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const update = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;
  const { content } = req.body;

  try {
    const result = await editComment(commentId, userId, content);
    res.send(result);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const like = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  try {
    const result = await likeComment(commentId, userId);
    res.send(result);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const reply = async (req, res, next) => {
  const { commentId } = req.params;
  const data = {
    user: req.user.id,
    content: req.body.content,
  };

  try {
    const result = await replyComment(commentId, data);
    res.send(result);
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  insert,
  remove,
  update,
  like,
  reply,
};
