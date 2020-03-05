import axios from '../services/api';
import types from './_types'

export function fetchNotifications() {
  return dispatch => {
    dispatch({ type: types.LOADING_NOTIFICATIONS })
    axios.get('/api/notifications')
      .then(notifications => {
        dispatch({ type: types.GET_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(err => {
        dispatch({ 
          type: types.GET_NOTIFICATIONS_ERROR, 
          payload: err.response.data.message
        })
      })
  }
}

export function markAsReadAllNotifications() {
  return dispatch => {
    axios.put('/api/notifications/markallasread')
      .then(notifications => {
        dispatch({ type: types.READ_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(err => {
        dispatch({ 
          type: types.READ_NOTIFICATIONS_ERROR, 
          payload: err.response.data.message
        })
      })
  }
}