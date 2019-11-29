import axios from '../services/api';
import types from './_types'

const loadingGroups = () => {
  return {
    type: 'GROUPS_IS_LOADING'
  };
};

export const fetchAllPublicGroups = () => dispatch => {
  dispatch(loadingGroups())
  axios.get('/api/groups/public')
    .then(groups => {
      dispatch({ type: "FETCH_ALL_PUBLIC_GROUPS", payload: groups.data })
    })
    .catch(err => {
      dispatch({ type: "erro" })
    })
};

export const fetchAllAuthGroups = () => dispatch => {
  dispatch(loadingGroups())
  axios.get('/api/groups/auth')
    .then(groups => {
      dispatch({ type: "FETCH_ALL_AUTH_GROUPS", payload: groups.data })
    })
    .catch(err => {
      dispatch({ type: "erro" })
    })
};