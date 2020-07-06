const INITIAL_STATE = { allCategories: [], category: '', isLoading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ALL_CATEGORIES':
      return { ...state, allCategories: action.payload, isLoading: false };
    case 'CATEGORIES_LOADING':
      return { ...state, isLoading: true };
    case 'CATEGORY_ADDED':
      return { ...state, category: action.payload.data };
    default:
      return state;
  }
};
