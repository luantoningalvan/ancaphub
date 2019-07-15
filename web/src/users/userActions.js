import axios from "axios";
import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, GET_USER_SUCCESS, GET_USER_FAIL } from '../utils/types'

export const getAllUsers = () => dispatch => {
  axios.get(`/api/users`)
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
}

export const getUser = id => dispatch => {
  axios.get(`/api/users/${id}`)
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
}