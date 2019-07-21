import axios from 'axios'
import { ADD_POST_SUCCESS, LOAD_USER_POSTS_SUCCESS, UPDATE_LIKES_SUCCESS, UPDATE_LIKES_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR } from '../../utils/types'

export function loadUserPosts(user) {
  return (dispatch) => {
    axios.get(`/api/posts/${user}`)
      .then(function (posts) {
        dispatch({ type: LOAD_USER_POSTS_SUCCESS, payload: posts.data });
      })
      .catch(function (error) {
        console.error("Erro ao carregar postagens: ", error);
      });
  }
}

export function createPost({ content }, user) {
  return (dispatch) => {
    axios.post(`/api/posts`, { content })
      .then(function (result) {
        dispatch({ type: ADD_POST_SUCCESS, payload: { ...result.data, user } });
      })
      .catch(function (error) {
        console.error("Erro ao adicionar postagem: ", error);
      });
  }
}

export function deletePost(post) {
  return dispatch => {
    axios.delete(`/api/posts/${post}`)
      .then(result => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: post })
      })
      .catch(error => {
        dispatch({ type: DELETE_POST_ERROR })
      })
  }
}

export function updateLikes(post) {
  return dispatch => {
    axios.put(`/api/posts/${post}/like`)
      .then(result => {
        dispatch({ type: UPDATE_LIKES_SUCCESS, payload: result.data })
      })
      .catch(error => {
        dispatch({ type: UPDATE_LIKES_ERROR })
      })
  }
}