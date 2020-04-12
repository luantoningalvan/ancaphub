export const Types = {
  GET_NOTIFICATIONS_REQUEST: 'users/get_notifications_request',
  GET_NOTIFICATIONS_SUCCESS: 'users/get_notifications_success',
  MARK_ALL_AS_READ_REQUEST: 'users/mark_all_as_read_request',
  MARK_ALL_AS_READ_SUCCESS: 'users/mark_all_as_read_success',
};

export const getNotificationsRequest = () => ({
  type: Types.GET_NOTIFICATIONS_REQUEST,
});

export const getNotificationsSuccess = (data) => ({
  type: Types.GET_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const markAllAsReadRequest = () => ({
  type: Types.MARK_ALL_AS_READ_REQUEST,
});

export const markAllAsReadSuccess = (data) => ({
  type: Types.MARK_ALL_AS_READ_SUCCESS,
  payload: data,
});

