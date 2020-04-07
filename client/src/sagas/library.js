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

function* getItems() {
  try {
    const items = yield call(api.getLibraryItems);
    yield put(actions.getItemsSuccess({ items: items.data }));
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

function* watchGetLibraryItemsRequest() {
  yield takeLatest(actions.Types.GET_ITEMS_REQUEST, getItems);
}

function* watchGetSingleLibraryItemRequest() {
  yield takeLatest(actions.Types.GET_SINGLE_ITEM_REQUEST, getSingleItem);
}

export default [
  fork(watchCreateLibraryItemRequest),
  fork(watchGetLibraryItemsRequest),
  fork(watchGetSingleLibraryItemRequest),
];
