const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
isEqual = require('lodash.isequal');

const insertComment = async (postId, data) => {
  try {
    const post = await Post.findById(postId)
    
    if (!post) throw new Error('Este post não existe.')
    const comment = await Comment.create(data)
    await post.comments.push(comment)
    await post.save()

    return await comment
  } catch (e) {
    throw new Error(e.message)
  }
}

const removeComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId)
    
    if (!comment || comment.user != userId) throw new Error('Este comentário não existe ou não percence a você.')
    await Comment.findByIdAndRemove(commentId) 

    return true
  } catch (e) {
    throw new Error(e.message)
  }
}

const editComment = async (commentId, userId, data) => {
  try {
    const oldComment = await Comment.findById(commentId)
    if (!oldComment || oldComment.user != userId) throw new Error('Este comentário não existe ou não percence a você.')

    const comment = await Comment.findByIdAndUpdate(commentId, {
      $set:{
        'content': data
      }
    }, { new: true })
    return await comment
    .populate("user", "_id name username avatar isVerified")
    .execPopulate()
  } catch (e) {
    throw new Error(e.message)
  }
}

const likeComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) throw new Error('Este comentário não existe.')

    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }
    await comment.save()

    return comment
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { insertComment, removeComment, editComment, likeComment };
