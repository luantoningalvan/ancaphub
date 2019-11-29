import axios from '../services/api';
import types from './_types'

export function fetchNotifications() {
  return dispatch => {
    dispatch({ type: types.LOADING_NOTIFICATIONS })
    axios.get('/api/notifications')
      .then(notifications => {
        dispatch({ type: types.GET_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(error => {
        dispatch({ type: types.GET_NOTIFICATIONS_ERROR, payload: error })
      })
  }
}

export function markAsReadAllNotifications() {
  return dispatch => {
    axios.put('/api/notifications')
      .then(notifications => {
        dispatch({ type: types.READ_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(error => {
        dispatch({ type: types.READ_NOTIFICATIONS_ERROR, payload: error })
      })
  }
}