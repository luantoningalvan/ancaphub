const Post = require('../models/PostModel');
isEqual = require('lodash.isequal');

const getManyPosts = async ({ filter, pageSize, currentPage }, auth) => {
  try {
    let posts = await Post.find(filter)
      .sort({ createdAt: 'desc' })
      .limit(parseInt(pageSize))
      .skip(pageSize * currentPage - pageSize)
      .populate('user', 'name username id avatar')

    if (auth) {
      posts = posts.map(post => ({
        ...post._doc,
        hasLiked: post.likes.includes(auth.id),
      }))
    }

    return posts
  } catch (e) {
    throw new Error(e.message)
  }
}

const getPost = async (postId, auth) => {
  try {
    const post = await Post.findById(postId)
    return auth ? { ...post._doc, hasLiked: post.likes.includes(auth.id)} : post
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertPost = async (data) => {
  try {
    const post = new Post(data);
    await post.save();
    return await post.populate('user', 'name username id avatar').execPopulate();
  } catch (e) {
    throw new Error(e.message)
  }
}

const removePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Este post não existe.')
    if (!isEqual(JSON.stringify(post.user), JSON.stringify(userId))) throw new Error('Você não tem autorização para excluir esta postagem')
    post.remove();
    return await post.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

const likePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Este post não existe.')

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return { _id: post._id, likes: post.likes, hasLiked: post.likes.includes(userId)}
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getManyPosts, getPost, insertPost, removePost, likePost };
