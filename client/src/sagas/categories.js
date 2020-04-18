import {
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/categories';
import * as api from '../api/categories';
import { addAlert } from '../actions/alerts';

function* getCategories() {
  try {
    const categories = yield call(api.getCategories);
    yield put(actions.loadCategoriesSuccess(categories.data));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* watchGetCategories() {
  yield takeLatest(actions.Types.LOAD_CATEGORIES_REQUEST, getCategories);
}

export default [
  fork(watchGetCategories),
];
