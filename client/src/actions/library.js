
export const Types = {
  SEND_ARTICLE_REQUEST: 'library/send_article_request',
  SEND_ARTICLE_SUCCESS: 'library/send_article_success',
  GET_ARTICLES_REQUEST: 'library/get_articles_request',
  GET_ARTICLES_SUCCESS: 'library/get_articles_success',
  SEND_BOOK_REQUEST: 'library/send_book_request',
  SEND_BOOK_SUCCESS: 'library/send_book_success',
  GET_BOOKS_REQUEST: 'library/get_books_request',
  GET_BOOKS_SUCCESS: 'library/get_books_success',
  SEND_VIDEO_REQUEST: 'library/send_video_request',
  SEND_VIDEO_SUCCESS: 'library/send_video_success',
  GET_VIDEOS_REQUEST: 'library/get_videos_request',
  GET_VIDEOS_SUCCESS: 'library/get_videos_success',
  LIBRARY_ERROR: 'library/library_error',
};

// Write requests

export const sendArticleRequest = (data) => ({
  type: Types.SEND_ARTICLE_REQUEST,
  payload: data,
});

export const sendBookRequest = (data) => ({
  type: Types.SEND_BOOK_REQUEST,
  payload: data,
});

export const sendVideoRequest = (data) => ({
  type: Types.SEND_VIDEO_REQUEST,
  payload: data,
});

// Read requests

export const getArticles = (data) => ({
  type: Types.GET_ARTICLES_REQUEST,
  payload: data,
});

export const getBooks = (data) => ({
  type: Types.GET_BOOKS_REQUEST,
  payload: data,
});

export const getVideos = (data) => ({
  type: Types.GET_VIDEOS_REQUEST,
  payload: data,
});

// Request success

export const sendArticleSuccess = (data) => ({
  type: Types.SEND_ARTICLE_SUCCESS,
  payload: data,
});

export const getArtiiclesSuccess = (data) => ({
  type: Types.GET_ARTICLES_SUCCESS,
  payload: data,
});

export const sendBookSuccess = (data) => ({
  type: Types.SEND_BOOK_SUCCESS,
  payload: data,
});

export const getBooksSuccess = (data) => ({
  type: Types.GET_BOOKS_SUCCESS,
  payload: data,
});

export const sendVideoSuccess = (data) => ({
  type: Types.SEND_VIDEO_SUCCESS,
  payload: data,
});

export const getVideosSuccess = (data) => ({
  type: Types.GET_VIDEOS_SUCCESS,
  payload: data,
});
