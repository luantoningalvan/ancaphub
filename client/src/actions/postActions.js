import axios from '../services/api';
import types from './_types'

export function loadUserFeed(props) {
  const pageSize = props && (props.pageSize || 10)
  const currentPage = props && (props.currentPage || 1)

  return dispatch => {
    dispatch({ type: types.LOADING_POSTS });
    axios
      .get(`/api/posts/auth/feed`, { params: { pageSize, currentPage } })
      .then(function (posts) {
        if(currentPage > 1){
          dispatch({ type: types.LOAD_MORE_POSTS_SUCCESS, payload: posts.data });
        } else {
          dispatch({ type: types.LOAD_USER_FEED_SUCCESS, payload: posts.data });
        }
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
      .catch(function (err) {
        dispatch({
          type: types.ADD_POST_FAILURE,
          payload: err.response.data.message
        })
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
      .catch(err => {
        dispatch({ 
          type: types.DELETE_POST_ERROR,
          payload: err.response.data.message
        });
      });
  };
}

export function updateLikes(post) {
  return dispatch => {
    axios
      .post(`/api/posts/${post}/like`)
      .then(result => {
        dispatch({ type: types.UPDATE_LIKES_SUCCESS, payload: result.data });
      })
      .catch(err => {
        dispatch({ 
          type: types.UPDATE_LIKES_ERROR,
          payload: err.response.data.message
        });
      });
  };
}
