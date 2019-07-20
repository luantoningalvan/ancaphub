import { GET_ALL_USERS_SUCCESS, GET_USER_SUCCESS, GET_USER_FAIL } from '../utils/types'

const initialState = {
  allUsers: [],
  user: {},
  userLibrary: {},
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case GET_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false
      }
    default:
      return state;
  }
}