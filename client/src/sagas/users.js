import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/users';
import * as alerts from '../actions/alerts';
import * as api from '../api/users';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message ));
  }
}

function* createUser({payload}) {
  try {
    const result = yield call(api.createUser, payload);
    localStorage.setItem("token", result.data.token);
    yield put(actions.createUserSuccess(result.data));

  } catch (e) {
    yield put(actions.createUserError());
    yield put(alerts.addAlert('error', e.message));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

export default [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
];
