import types from '../actions/_types'

const INITIAL_STATE = {
  notifications: [],
  notReadCount: 0,
  loading: true
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }
    case types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
        notReadCount: payload.notReadCount,
        loading: false
      }
    case types.READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notReadCount: 0
      }
    default:
      return state
  }
}