import axios from '../services/api';
import types from './_types'

export function loadAllPublicPosts() {
  return dispatch => {
    dispatch({ type: types.LOADING_POSTS });
    axios
      .get(`/api/posts/public`)
      .then(function (posts) {
        dispatch({ type: types.LOAD_PUBLIC_POSTS_SUCCESS, payload: posts.data });
      })
      .catch(function (error) {
        console.error('Erro ao carregar postagens: ', error);
      });
  };
}

export function loadUserFeed() {
  return dispatch => {
    dispatch({ type: types.LOADING_POSTS });
    axios
      .get(`/api/posts/feed`)
      .then(function (posts) {
        dispatch({ type: types.LOAD_USER_FEED_SUCCESS, payload: posts.data });
      })
      .catch(function (error) {
        console.error('Erro ao carregar postagens: ', error);
      });
  };
}

export function loadUserPosts(user) {
  return dispatch => {
    dispatch({ type: types.LOADING_POSTS });
    axios
      .get(`/api/posts/user/${user}`)
      .then(function (posts) {
        dispatch({ type: types.LOAD_USER_POSTS_SUCCESS, payload: posts.data });
      })
      .catch(function (error) {
        console.error('Erro ao carregar postagens: ', error);
      });
  };
}

export function createPost({ content }) {
  return dispatch => {
    axios
      .post(`/api/posts`, { content })
      .then(function (result) {
        dispatch({ type: types.ADD_POST_SUCCESS, payload: result.data });
      })
      .catch(function (error) {
        console.error('Erro ao adicionar postagem: ', error);
      });
  };
}

export function deletePost(post) {
  return dispatch => {
    axios
      .delete(`/api/posts/${post}`)
      .then(result => {
        dispatch({ type: types.DELETE_POST_SUCCESS, payload: post });
      })
      .catch(error => {
        dispatch({ type: types.DELETE_POST_ERROR });
      });
  };
}

export function updateLikes(post) {
  return dispatch => {
    axios
      .put(`/api/posts/${post}/like`)
      .then(result => {
        dispatch({ type: types.UPDATE_LIKES_SUCCESS, payload: result.data });
      })
      .catch(error => {
        dispatch({ type: types.UPDATE_LIKES_ERROR });
      });
  };
}
