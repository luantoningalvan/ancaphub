
export const Types = {
  CREATE_ITEM_REQUEST: 'library/create_item_request',
  CREATE_ITEM_SUCCESS: 'library/create_item_success',
  GET_ITEMS_REQUEST: 'library/get_items_request',
  GET_ITEMS_SUCCESS: 'library/get_items_success',
  GET_BOOKS_REQUEST: 'library/get_books_request',
  GET_BOOKS_SUCCESS: 'library/get_books_success',
  GET_ARTICLES_REQUEST: 'library/get_articles_request',
  GET_ARTICLES_SUCCESS: 'library/get_articles_success',
  GET_VIDEOS_REQUEST: 'library/get_videos_request',
  GET_VIDEOS_SUCCESS: 'library/get_videos_success',
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

export const getArticlesRequest = (data) => ({
  type: Types.GET_ARTICLES_REQUEST,
  payload: data,
});

export const getArticlesSuccess = (data) => ({
  type: Types.GET_ARTICLES_SUCCESS,
  payload: data,
});

export const getBooksRequest = (data) => ({
  type: Types.GET_BOOKS_REQUEST,
  payload: data,
});

export const getBooksSuccess = (data) => ({
  type: Types.GET_BOOKS_SUCCESS,
  payload: data,
});

export const getVideosRequest = (data) => ({
  type: Types.GET_VIDEOS_REQUEST,
  payload: data,
});

export const getVideosSuccess = (data) => ({
  type: Types.GET_VIDEOS_SUCCESS,
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
