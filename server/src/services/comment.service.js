const Post = require('../models/PostModel');

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

module.exports = { insertComment };
