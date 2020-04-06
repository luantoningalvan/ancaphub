import { Types } from "../actions/posts";
import arrayToObject from "../utils/arrayToObject";

const INITIAL_STATE = {
  items: [],
  errorMessage: "",
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.CREATE_POST_SUCCESS:
      return {
        ...state,
        items: [payload, ...state.items],
      };
    case Types.GET_POSTS_SUCCESS:
      const items = arrayToObject(payload.items, "_id");
      return { ...state, items };
    case Types.LIKE_POST_REQUEST:
      return {
        ...state,
        items: {
          ...state.items,
          [payload]: {
            ...state.items[payload],
            hasLiked: !state.items[payload].hasLiked,
          },
        },
      };
    case Types.LIKE_POST_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload._id]: {
            ...state.items[payload._id],
            ...payload
          },
        },
      };

    case Types.POST_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    default:
      return state;
  }
};
