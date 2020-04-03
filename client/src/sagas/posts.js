import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/posts';
import * as api from '../api/posts';

function* createPost(action) {
  try {
    const data = action.payload;
    console.log(data)
    yield call(api.createPost, data);
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* watchCreatePostRequest() {
  yield takeLatest(actions.Types.CREATE_POST_REQUEST, createPost);
}

export default [
  fork(watchCreatePostRequest),
];
