const Post = require('../models/PostModel');
isEqual = require('lodash.isequal');

const insertComment = async (postId, data) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, { $push: { comments: data } }, { new: true })
    if (!post) throw new Error('Este post não existe.')
    return await post
    .populate("comments.user", "_id name username avatar")
    .execPopulate()
  } catch (e) {
    throw new Error(e.message)
  }
}

const removeComment = async (postId, commentId, userId) => {
  console.log(postId, commentId, userId)
  try {
    const post = await Post.findOneAndUpdate(
      {_id: postId, "comments._id": commentId, "comments.user": userId},
      { $pull: { comments: { _id: commentId}}}
    )
    if (!post) throw new Error('Este comentário não existe ou não percence a você.')

    return true
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { insertComment, removeComment };
