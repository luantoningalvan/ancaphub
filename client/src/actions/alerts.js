export const Types = {
  ADD_ALERT: 'alerts/add_alert',
};

export const addAlert = (type, message) => ({
  type: Types.ADD_ALERT,
  payload: { type, message },
})