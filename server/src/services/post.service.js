const mongoose = require('mongoose');

const Post = require('../models/PostModel');
const Poll = require('../models/PollModel');
isEqual = require('lodash.isequal');

const getManyPosts = async ({ filter, pageSize, currentPage }, auth) => {
  try {
    let posts = await Post.find(filter)
      .sort({ createdAt: 'desc' })
      .limit(parseInt(pageSize))
      .skip(pageSize * currentPage - pageSize)
      .populate('user', 'name username id avatar isVerified')
      .populate('poll')

    if (auth) {
      posts = posts.map(post => ({
        ...post._doc,
        hasLiked: post.likes.includes(auth.id),
        likeCount: post.likes.length,
        commentCount: post.comments.length
      }))
    }

    return posts
  } catch (e) {
    throw new Error(e.message)
  }
}

const getPost = async (postId, auth) => {
  try {
    const post = await Post
    .findById(postId)
    .populate(["likes"])
    .populate('user')
    .populate('comments')
    .populate('poll')

    const likes = post.likes.filter((like) => like._id)
    return auth ? { 
      ...post._doc, 
      hasLiked: likes.includes(auth.id),
      likeCount: post.likes.length
    } : post
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertPost = async (data) => {
  try {

    const { content, mediaType, media, user } = data;
    let postData = {
      user
    };

    if (!mediaType || mediaType === 'none'){
      postData = {
        ...postData,
        content
      }

      const post = await Post.create(postData)

      await post.populate('user', 'name username id avatar isVerified').execPopulate();
      return { ...post._doc, hasLiked: false, likeCount: 0 }
    }

    if (mediaType === 'embed' || mediaType === 'image'){
      postData = {
        ...postData,
        content,
        media: {
          mediaType,
          data: media
        }
      }

      const post = await Post.create(postData);

      await post.populate('user', 'name username id avatar isVerified').execPopulate();
      return { ...post._doc, hasLiked: false, likeCount: 0 }
    }

    if (mediaType === 'poll'){
      let pollData = [];
      
      media.map(option =>{
        pollData = [...pollData, {
          title: option,
          votes: 0
        }]
      })
      const poll = await Poll.create({options: pollData})
      const pollId = mongoose.Types.ObjectId(poll._id)

      postData = {
        ...postData,
        content,
        media: {
          mediaType,
          data: pollId
        },
        poll: pollId
      }

      const post = await Post.create(postData)
      
      await post.save()
      await post.populate('user', 'name username id avatar isVerified').populate('poll').execPopulate();
      return { ...post._doc, hasLiked: false, likeCount: 0 }
    }

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
    return { _id: post._id, likes: post.likes, likeCount: post.likes.length, hasLiked: post.likes.includes(userId)}
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getManyPosts, getPost, insertPost, removePost, likePost };
