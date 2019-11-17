import axios from '../services/api';
import {
  LOADING_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  READ_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_ERROR
} from '../utils/types';

export function fetchNotifications() {
  return dispatch => {
    dispatch({ type: LOADING_NOTIFICATIONS })
    axios.get('/api/notifications')
      .then(notifications => {
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(error => {
        dispatch({ type: GET_NOTIFICATIONS_ERROR, payload: error })
      })
  }
}

export function markAsReadAllNotifications() {
  return dispatch => {
    axios.put('/api/notifications')
      .then(notifications => {
        dispatch({ type: READ_NOTIFICATIONS_SUCCESS, payload: notifications.data })
      })
      .catch(error => {
        dispatch({ type: READ_NOTIFICATIONS_ERROR, payload: error })
      })
  }
}