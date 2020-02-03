import types from '../actions/_types'

const INITIAL_STATE = { allCategories: [], category: {}, isLoading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CATEGORIES_SUCCESS:
      return { ...state, allCategories: action.payload, isLoading: false };
    case types.LOADING_CATEGORIES:
      return { ...state, isLoading: true };
    case types.ADD_CATEGORY_SUCCESS:
      return { 
        ...state, 
        category: action.payload.data 
      };
    case types.UPDATE_CATEGORY_SUCCESS:
      return {         
        ...state,
        allCategories: state.allCategories.map(category =>
          category._id === action.payload._id ? { ...action.payload } : category
        )}  
    default:
      return state;
  }
};
