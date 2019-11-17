const INITIAL_STATE = { allCategories: [], category: '', isLoading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ALL_CATEGORIES':
      return { ...state, allCategories: action.payload, isLoading: false };
    case 'CATEGORIES_LOADING':
      return { ...state, isLoading: true };
    case 'CATEGORY_ADDED':
      return { 
        ...state, 
        category: action.payload.data 
      };
    case 'CATEGORY_EDITED':
      return {         
        ...state,
        allCategories: state.allCategories.map(category =>
          category._id === action.payload._id ? { ...action.payload } : category
        )}  
    default:
      return state;
  }
};
