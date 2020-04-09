import {
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/library';
import * as api from '../api/library';

function* createItem(action) {
  try {
    const item = yield call(api.createLibraryItem, action.payload);
    yield put(actions.createItemSuccess(item.data));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

function* getBooks(action) {
  try {
    const items = yield call(api.getAllBooks, action.payload);
    yield put(actions.getBooksSuccess({ items: items.data }));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

function* getArticles(action) {
  try {
    const items = yield call(api.getAllArticles, action.payload);
    yield put(actions.getArticlesSuccess({ items: items.data }));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

function* getVideos(action) {
  try {
    const items = yield call(api.getAllVideos, action.payload);
    yield put(actions.getVideosSuccess({ items: items.data }));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

function* getSingleItem(action) {
  try {
    const item = yield call(api.getSingleLibraryItem, action.payload);
    yield put(actions.getSingleItemSuccess(item.data));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

// Watchers

function* watchCreateLibraryItemRequest() {
  yield takeLatest(actions.Types.CREATE_ITEM_REQUEST, createItem);
}

function* watchGetLibraryBooks() {
  yield takeLatest(actions.Types.GET_BOOKS_REQUEST, getBooks);
}

function* watchGetLibraryVideos() {
  yield takeLatest(actions.Types.GET_VIDEOS_REQUEST, getVideos);
}

function* watchGetLibraryArticles() {
  yield takeLatest(actions.Types.GET_ARTICLES_REQUEST, getArticles);
}

function* watchGetSingleLibraryItemRequest() {
  yield takeLatest(actions.Types.GET_SINGLE_ITEM_REQUEST, getSingleItem);
}

export default [
  fork(watchCreateLibraryItemRequest),
  fork(watchGetLibraryBooks),
  fork(watchGetLibraryVideos),
  fork(watchGetLibraryArticles),
  fork(watchGetSingleLibraryItemRequest),
];
