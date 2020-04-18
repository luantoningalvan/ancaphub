import { takeLatest, call, fork, put } from "redux-saga/effects";

import * as actions from "../actions/library";
import * as api from "../api/library";

function* createItem(action) {
  try {
    const item = yield call(api.createLibraryItem, action.payload);
    yield put(actions.createItemSuccess(item.data));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

function* getItems({ payload }) {
  try {
    const filter = {
      ...(payload.category && payload.category !== "" && { category: payload.category }),
      ...(payload.type && payload.type !== "" && { type: payload.type }),
    };

    const items = yield call(api.getLibraryItems, filter);
    yield put(actions.getItemsSuccess(items.data));
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

function* getRecentItems() {
  try {
    const d = yield call(api.getRecentLibraryItems);
    yield put(actions.getRecentItemsSuccess(d.data));
  } catch (e) {
    yield put(actions.libraryError({ errorMessage: e.message }));
  }
}

// Watchers

function* watchCreateLibraryItemRequest() {
  yield takeLatest(actions.Types.CREATE_ITEM_REQUEST, createItem);
}

function* watchGetSingleLibraryItemRequest() {
  yield takeLatest(actions.Types.GET_SINGLE_ITEM_REQUEST, getSingleItem);
}

function* watchGetRecentLibraryItemsRequest() {
  yield takeLatest(actions.Types.GET_RECENT_ITEMS_REQUEST, getRecentItems);
}

function* watchGetItemsRequest() {
  yield takeLatest(actions.Types.GET_ITEMS_REQUEST, getItems);
}

export default [
  fork(watchCreateLibraryItemRequest),
  fork(watchGetSingleLibraryItemRequest),
  fork(watchGetRecentLibraryItemsRequest),
  fork(watchGetItemsRequest),
];
