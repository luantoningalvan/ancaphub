import types from "../actions/_types";

const INITIAL_STATE = { allCategories: [], category: {}, isLoading: false };

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_CATEGORIES:
      return { ...state, isLoading: true };
    case types.FETCH_ALL_CATEGORIES_SUCCESS:
      return { ...state, allCategories: payload, isLoading: false };
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategories: [...state.allCategories, payload.data]
      };
    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategories: state.allCategories.map(category =>
          category._id === payload._id ? { ...payload } : category
        )
      };
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategories: state.allCategories.filter(category =>
          { return category._id !== payload._id }
        )
      };
    default:
      return state;
  }
};
