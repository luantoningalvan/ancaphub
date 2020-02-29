const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
isEqual = require('lodash.isequal');

const insertComment = async (postId, data) => {
  try {
    const post = await Post.findById(postId)
    console.log(post)
    if (!post) throw new Error('Este post não existe.')
    const comment = await Comment.create(data)
    await post.comments.push(comment)
    await post.save()
    return await post
    .populate("comments.user", "_id name username avatar isVerified")
    .execPopulate()
  } catch (e) {
    throw new Error(e.message)
  }
}

const removeComment = async (postId, commentId, userId) => {
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

const editComment = async (postId, commentId, userId, data) => {
  try {
    const post = await Post.findOneAndUpdate(
      {_id: postId, "comments._id": commentId, "comments.user": userId},
      { '$set': {'comments.$.content': data}},
      { new: true }
    )
    if (!post) throw new Error('Este comentário não existe.')

    return await post
    .populate("comments.user", "_id name username avatar isVerified")
    .execPopulate()
  } catch (e) {
    throw new Error(e.message)
  }
}

const likeComment = async (postId, commentId, userId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Este post não existe.')

    const comment = post.comments.filter((comment) => {
      return comment._id == commentId
    })

    if (comment.length === 0) throw new Error('Este comentário não existe.')

    const indexComment = post.comments.indexOf(comment[0])

    if (post.comments[indexComment].likes.includes(userId)) {
      post.comments[indexComment].likes.pull(userId);
    } else {
      post.comments[indexComment].likes.push(userId);
    }
    await post.save();
    return { _id: post.comments[indexComment]._id, likes: post.comments[indexComment].likes, likeCount: post.comments[indexComment].likes.length, hasLiked: post.comments[indexComment].likes.includes(userId)}
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { insertComment, removeComment, editComment, likeComment };
