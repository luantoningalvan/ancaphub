import { takeLatest, call, fork, put } from "redux-saga/effects";

import * as actions from "../actions/auth";
import * as api from "../api/auth";

function* authUser(action) {
  try {
    const data = action.payload;
    const response = yield call(api.authUser, data);
    localStorage.setItem("token", response.data.token);
    yield put(actions.authUserSuccess(response.data));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* loadUser(action) {
  try {
    const response = yield call(api.loadUser);
    yield put(actions.loadUserSuccess(response.data));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* logout() {
  yield put(actions.logout());
}

function* watchAuthUserRequest() {
  yield takeLatest(actions.Types.AUTH_USER_REQUEST, authUser);
}

function* watchLoadUserRequest() {
  yield takeLatest(actions.Types.LOAD_USER_REQUEST, loadUser);
}

function* watchLogout() {
  yield takeLatest(actions.Types.LOGOUT, logout);
}

export default [
  fork(watchAuthUserRequest),
  fork(watchLogout),
  fork(watchLoadUserRequest)
];
