import types from '../actions/_types'

const INITIAL_STATE = {
  posts: [],
  loading: true
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_POSTS:
      return {
        ...state,
        loading: true
      }
    case types.LOAD_PUBLIC_POSTS_SUCCESS:
    case types.LOAD_USER_FEED_SUCCESS:
    case types.LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
      case types.LOAD_MORE_POSTS_SUCCESS:
        return {
          ...state,
          posts: [ ...state.posts, ...payload],
          loading: false
        }  
    case types.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(value => {
          return value._id !== payload;
        })
      };
    case types.ADD_COMMENT_SUCCESS: 
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload._id ? { ...post, comments:payload.comments  } : post
        )
      }  
    case types.UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload._id ? { ...post, ...payload } : post
        )
      };
    default:
      return state;
  }
}
