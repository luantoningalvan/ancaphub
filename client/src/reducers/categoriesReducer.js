import types from '../actions/_types'

const INITIAL_STATE = { allCategories: [], category: '', isLoading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CATEGORIES:
      return { ...state, allCategories: action.payload, isLoading: false };
    case types.CATEGORIES_LOADING:
      return { ...state, isLoading: true };
    case types.CATEGORY_ADDED:
      return { ...state, category: action.payload.data };
    default:
      return state;
  }
};
