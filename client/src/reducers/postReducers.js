import {
  ADD_POST_SUCCESS,
  UPDATE_LIKES_SUCCESS,
  LOAD_USER_FEED_SUCCESS,
  DELETE_POST_SUCCESS,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_PUBLIC_POSTS_SUCCESS,
  LOADING_POSTS
} from '../utils/types';

const initialState = {
  posts: [],
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      }
    case LOAD_PUBLIC_POSTS_SUCCESS:
    case LOAD_USER_FEED_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(value => {
          return value._id !== payload;
        })
      };
    case UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload._id ? { ...post, likes: payload.likes } : post
        )
      };
    default:
      return state;
  }
}
