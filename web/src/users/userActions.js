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
