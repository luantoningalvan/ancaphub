import { Types } from '../actions/categories';

const INITIAL_STATE = {
  items: [],
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    default:
      return state;
  }
};
