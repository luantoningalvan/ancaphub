import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/relationships';
import * as alerts from '../actions/alerts';
import * as api from '../api/users';

function* followUser({ payload }) {
  try {
    const result = yield call(api.followUser, payload);
    yield put(actions.followUserSuccess(result.data));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}

function* unfollowUser({ payload }) {
  try {
    const result = yield call(api.unfollowUser, payload);
    yield put(actions.unfollowUserSuccess(result.data));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message));
  }
}


function* watchFollowUser() {
  yield takeEvery(actions.Types.FOLLOW_USER_REQUEST, followUser);
}

function* watchUnfollowUser() {
  yield takeEvery(actions.Types.UNFOLLOW_USER_REQUEST, unfollowUser);
}

export default [
  fork(watchFollowUser),
  fork(watchUnfollowUser),
];
