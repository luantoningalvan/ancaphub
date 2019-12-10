import axios from '../services/api';
import types from './_types'

const loadingGroups = () => {
  return {
    type: types.GROUPS_IS_LOADING
  };
};

export const fetchAllPublicGroups = () => dispatch => {
  dispatch(loadingGroups())
  axios.get('/api/groups/list/public')
    .then(groups => {
      dispatch({ type: types.FETCH_PUBLIC_GROUPS_SUCCESS, payload: groups.data })
    })
    .catch(err => {
      dispatch({ type: types.FETCH_PUBLIC_GROUPS_FAILURE })
    })
};

export const fetchAllAuthGroups = () => dispatch => {
  dispatch(loadingGroups())
  axios.get('/api/groups/list/auth')
    .then(groups => {
      dispatch({ type: types.FETCH_AUTH_GROUPS_SUCCESS, payload: groups.data })
    })
    .catch(err => {
      dispatch({ type: types.FETCH_AUTH_GROUPS_FAILURE })
    })
};

export const fetchGroup = (id) => dispatch => {
  dispatch(loadingGroups())
  axios.get(`/api/groups/${id}`)
    .then(groups => {
      dispatch({ type: types.FETCH_GROUP_SUCCESS, payload: groups.data })
    })
    .catch(err => {
      dispatch({ type: types.FETCH_GROUP_FAILURE })
    })
};