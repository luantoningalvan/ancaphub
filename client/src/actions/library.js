
export const Types = {
  CREATE_ITEM_REQUEST: 'library/create_item_request',
  CREATE_ITEM_SUCCESS: 'library/create_item_success',
  GET_ITEMS_REQUEST: 'library/get_items_request',
  GET_ITEMS_SUCCESS: 'library/get_items_success',
  GET_SINGLE_ITEM_REQUEST: 'library/get_single_item_request',
  GET_SINGLE_ITEM_SUCCESS: 'library/get_single_item_success',
  LIBRARY_ERROR: 'library/library_error',
};

export const createItemRequest = (data) => ({
  type: Types.CREATE_ITEM_REQUEST,
  payload: data,
});

export const createItemSuccess = (data) => ({
  type: Types.CREATE_ITEM_SUCCESS,
  payload: data,
});

export const getItemsRequest = (data) => ({
  type: Types.GET_ITEMS_REQUEST,
  payload: data,
});

export const getItemsSuccess = (data) => ({
  type: Types.GET_ITEMS_SUCCESS,
  payload: data,
});

export const getSingleItemRequest = (data) => ({
  type: Types.GET_SINGLE_ITEM_REQUEST,
  payload: data,
});

export const getSingleItemSuccess = (data) => ({
  type: Types.GET_SINGLE_ITEM_SUCCESS,
  payload: data,
});

export const libraryError = (data) => ({
  type: Types.LIBRARY_ERROR,
  payload: data,
});
