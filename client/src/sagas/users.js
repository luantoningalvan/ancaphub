import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
  try {
    const data = action.payload;
    yield call(api.createUser, data);
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

export default [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
];
