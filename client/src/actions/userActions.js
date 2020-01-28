import axios from '../services/api';
import types from './_types'
import { showSnack } from './alertActions'

export const getAllUsers = (filter) => dispatch => {
  dispatch({ type: types.LOADING_USERS })
  axios
    .get(`/api/users${filter ? `?filterOn=username&&filter=${filter}` : ''}`)
    .then(users => {
      dispatch({
        type: types.GET_ALL_USERS_SUCCESS,
        payload: users.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_ALL_USERS_FAIL,
        payload: err.response.data.message
      });
    });
};

export const getUser = id => dispatch => {
  dispatch({ type: types.LOADING_USERS })
  axios
    .get(`/api/users/${id}`)
    .then(user => {
      dispatch({
        type: types.GET_USER_SUCCESS,
        payload: user.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_FAIL,
        payload: err.response.data.message
      });
    });
};

export const getUserLibrary = id => dispatch => {
  axios
    .get(`/api/users/${id}/library`)
    .then(library => {
      dispatch({
        type: types.GET_USER_LIBRARY_SUCCESS,
        payload: library.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_LIBRARY_FAIL,
        payload: err.response.data.message
      });
    });
};

export const getUserContributions = id => dispatch => {
  axios
    .get(`/api/users/${id}/contributions`)
    .then(contributions => {
      dispatch({
        type: types.GET_USER_CONTRIBUTIONS_SUCCESS,
        payload: contributions.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_CONTRIBUTIONS_FAIL,
        payload: err.response.data.message
      });
    });
};

export const updateUser = ({
  name,
  bio,
  site,
  currentCity,
  birthday,
  avatar
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    bio,
    site,
    currentCity,
    birthday,
    avatar
  });

  try {
    const res = await axios.put(`/api/users/profile`, body, config);
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: res.data
    });
    dispatch(showSnack("Perfil Atualizado com sucesso"))
  } catch (err) {
    dispatch({
      type: types.UPDATE_USER_FAIL,
      payload: err.response.data.message
    })
  }
};

export const getUserFollowers = id => dispatch => {
  axios
    .get(`/api/users/${id}/followers`)
    .then(user => {
      dispatch({
        type: types.GET_USER_FOLLOWERS_SUCCESS,
        payload: user.data.followers
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_FOLLOWERS_FAIL,
        payload: err.response.data.message
      });
    });
};

export const getUserFollowing = id => dispatch => {
  axios
    .get(`/api/users/${id}/following`)
    .then(user => {
      dispatch({
        type: types.GET_USER_FOLLOWING_SUCCESS,
        payload: user.data.following
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_USER_FOLLOWING_FAIL,
        payload: err.response.data.message
      });
    });
};

export const followUser = user => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${user}/follow`);
    dispatch({
      type: types.FOLLOW_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.FOLLOW_USER_FAIL,
      payload: err.response.data.message
    });
  }
};

export const unfollowUser = user => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${user}/unfollow`);
    dispatch({
      type: types.UNFOLLOW_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.UNFOLLOW_USER_FAIL,
      payload: err.response.data.message
    });
  }
};
