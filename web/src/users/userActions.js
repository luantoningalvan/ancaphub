import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/users'

export const getAllUsers = () => dispatch => {
  axios.get(`${BASE_URL}`)
    .then(users => {
      dispatch({
        type: 'GET_ALL_USERS_SUCCESS',
        payload: users.data
      });
    })
    .catch(err => {
      dispatch({
        type: 'GET_ALL_USERS_FAIL',
        payload: err
      });
    });
}

export const getUser = id => dispatch => {
  axios.get(`${BASE_URL}/${id}`)
    .then(user => {
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: user.data
      });
    })
    .catch(err => {
      dispatch({
        type: 'GET_USER_FAIL',
        payload: err
      });
    });
}

export const getUserLibrary = () => (dispatch, getState) => {
  const state = getState()
  const userId = state.auth.user.id
  axios.get(`${BASE_URL}/${userId}/library`)
  .then(user => {
    dispatch({
      type: 'GET_USER_LIBRARY_SUCCESS',
      payload: user.data
    });
  })
  .catch(err => {
    dispatch({
      type: 'GET_USER_LIBRARY_FAIL',
      payload: err
    });
  });
}

export const updateLibrary = (item, type, action) => (dispatch, getState) => {

  const state = getState()
  const userId = state.auth.user.id
  axios.put(`${BASE_URL}/${userId}/library`, { item, type, action })
    .then(user => {
      dispatch({
        type: 'ADD_TO_LIBRARY_SUCCESS',
        payload: user.data
      });
    })
    .catch(err => {
      dispatch({
        type: 'ADD_TO_LIBRARY_FAIL',
        payload: err
      });
    });
}