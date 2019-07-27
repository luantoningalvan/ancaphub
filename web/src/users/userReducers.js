import {
  GET_ALL_USERS_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL
} from '../utils/types'

const initialState = {
  allUsers: [],
  user: null,
  userLibrary: {},
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: payload,
        loading: false
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case GET_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, followers: payload }
      }
    default:
      return state;
  }
}