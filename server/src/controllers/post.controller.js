const { postService, userService } = require('../services')
const { getManyPosts, insertPost, removePost, likePost, getPost } = postService
const { getUser } = userService
const verifyToken = require('../utils/verifyToken')

const getUserFeed = async (req, res, next) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 10
  const currentPage = req.query.currentPage ? req.query.currentPage : 1
  const { id:userId } = req.user 

  try {
    const userFollowing = await getUser(userId);
    const filterQuery = { user: [...userFollowing.following, userId] }
    const result = await getManyPosts({filter: filterQuery, pageSize, currentPage}, req.user)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const getUserPosts = async (req, res, next) => {
  const { id } = req.params
  const auth = verifyToken(req)
  try {
    const result = await getManyPosts({filter: { user: id }}, auth)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params
  const auth = verifyToken(req)
  try {
    const result = await getPost(id, auth)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const insert = async (req, res, next) => {
  const { content } = req.body;
  const { id:userId } = req.user;

  try {
    const result = await insertPost({content, user: userId})
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const remove = async (req, res, next) => {
  const { id:userId } = req.user
  const { id:postId } = req.params

  try {
    const result = await removePost(postId, userId)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const like = async (req, res, next) => {
  const { id:userId } = req.user
  const { id:postId } = req.params

  try {
    const result = await likePost(postId, userId)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

module.exports = { getUserFeed, getUserPosts, getPostById, insert, remove, like };
