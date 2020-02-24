const { commentService } = require('../services')
const { insertComment, removeComment, likeComment } = commentService

const insert = async (req, res, next) => {
  const { postId } = req.params
  const data = {
    user: req.user.id,
    content: req.body.content,
  }

  try {
    const result = await insertComment(postId, data)
    res.send({ 
      _id: result._id,
      comments: result.comments
    });
    next()
  } catch (e) {
    next(e)
  }
};

const remove = async (req, res, next) => {
  const { postId, commentId } = req.params
  const { id:userId } = req.user

  try {
    const result = await removeComment(postId,commentId,userId)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const update = async (req, res, next) => {
  res.send(true)
};

const like = async (req, res, next) => {
  const { postId, commentId } = req.params
  const { id:userId } = req.user

  try {
    const result = await likeComment(postId, commentId, userId)
    res.send(result)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = { insert, remove, update , like};
