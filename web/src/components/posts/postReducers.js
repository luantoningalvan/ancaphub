import { ADD_POST_SUCCESS, DELETE_POST_SUCCESS, LOAD_USER_POSTS_SUCCESS } from '../../utils/types'

const initialState = {
  posts: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts]
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((value) => { return value._id != payload })
      }
    default:
      return state;
  }
}