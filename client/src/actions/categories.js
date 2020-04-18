export const Types = {
  LOAD_CATEGORIES_REQUEST: 'comments/load_categories_request',
  LOAD_CATEGORIES_SUCCESS: 'comments/load_categories_success',
};

export const loadCategoriesRequest = () => ({
  type: Types.LOAD_CATEGORIES_REQUEST,
});

export const loadCategoriesSuccess = (data) => ({
  type: Types.LOAD_CATEGORIES_SUCCESS,
  payload: data,
});
