import { Types } from '../actions/notifications';

const INITIAL_STATE = {
  notifications: [],
  notReadCount: 0,
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
        notReadCount: payload.notReadCount
      }
    case Types.MARK_ALL_AS_READ_SUCCESS:
      return {
        ...state,
        notReadCount: 0
      }  
    default:
      return state;
  }
};
