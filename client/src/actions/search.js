export const Types = {
  SEARCH_TERM_REQUEST: 'search/search_term_request',
  SEARCH_TERM_SUCCESS: 'search/search_term_success',
  SEARCH_NEARBY_USERS_REQUEST: 'search/search_nearby_users_request',
  SEARCH_NEARBY_USERS_SUCCESS: 'search/search_nearby_users_success',
};

export const searchTermRequest = (term) => ({
  type: Types.SEARCH_TERM_REQUEST,
  payload: term,
});

export const searchTermSuccess = (data) => ({
  type: Types.SEARCH_TERM_SUCCESS,
  payload: data,
});

export const searchNearbyUserRequest = ({radius, lastLocation}) => ({
  type: Types.SEARCH_NEARBY_USERS_REQUEST,
  payload: {radius, lastLocation},
});

export const searchNearbyUserSuccess = (data) => ({
  type: Types.SEARCH_NEARBY_USERS_SUCCESS,
  payload: data,
});
