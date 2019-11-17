import {
  LOADING_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_SUCCESS
} from '../utils/types';

const initialState = {
  notifications: [],
  notReadCount: 0,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
        notReadCount: payload.notReadCount,
        loading: false
      }
    case READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notReadCount: 0
      }
    default:
      return state
  }
}