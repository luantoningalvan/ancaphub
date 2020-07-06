import axios from 'axios';
import {
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWERS_FAIL,
  GET_USER_COLLECTION_SUCCESS,
  GET_USER_COLLECTION_FAIL,
  GET_USER_FOLLOWING_SUCCESS,
  GET_USER_FOLLOWING_FAIL,
  GET_USER_CONTRIBUTIONS_SUCCESS,
  GET_USER_CONTRIBUTIONS_FAIL
} from '../../utils/types';
import { setAlerts, clearAlerts } from '../../alerts/alertActions';

export const getAllUsers = () => dispatch => {
  axios
    .get(`/api/users`)
    .then(users => {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: users.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_USERS_FAIL,
        payload: err
      });
    });
};

export const getUser = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(user => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: user.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FAIL,
        payload: err
      });
    });
};

export const getUserFollowers = id => dispatch => {
  axios
    .get(`/api/users/${id}/followers`)
    .then(user => {
      dispatch({
        type: GET_USER_FOLLOWERS_SUCCESS,
        payload: user.data.followers
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FOLLOWERS_FAIL,
        payload: err
      });
    });
};

export const getUserFollowing = id => dispatch => {
  axios
    .get(`/api/users/${id}/following`)
    .then(user => {
      dispatch({
        type: GET_USER_FOLLOWING_SUCCESS,
        payload: user.data.following
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FOLLOWING_FAIL,
        payload: err
      });
    });
};

export const getUserCollection = id => dispatch => {
  axios
    .get(`/api/users/${id}/collection`)
    .then(collection => {
      dispatch({
        type: GET_USER_COLLECTION_SUCCESS,
        payload: collection.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_COLLECTION_FAIL,
        payload: err
      });
    });
};

export const getUserContributions = id => dispatch => {
  axios
    .get(`/api/users/${id}/contributions`)
    .then(contributions => {
      dispatch({
        type: GET_USER_CONTRIBUTIONS_SUCCESS,
        payload: contributions.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_CONTRIBUTIONS_FAIL,
        payload: err
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
    const res = await axios.put(`/api/users/`, body, config);
    dispatch(clearAlerts());
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlerts(errors));
    }

    dispatch({
      type: UPDATE_USER_FAIL
    });
  }
};

export const followUser = user => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user}/follow`);
    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL
    });
  }
};
