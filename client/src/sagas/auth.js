import {
  takeLatest, call, fork, put,
} from 'redux-saga/effects';
import * as actions from '../actions/auth';
import { getNotificationsRequest } from '../actions/notifications';
import * as api from '../api/auth';

function* authUser(action) {
  try {
    const data = action.payload;
    const response = yield call(api.authUser, data);
    localStorage.setItem('token', response.data.token);
    document.location.reload();
  } catch (e) {
    yield put(actions.authError({ errorMessage: e.message }));
  }
}

function* loadUser() {
  try {
    const response = yield call(api.loadUser);
    yield put(actions.loadUserSuccess(response.data));
    yield put(getNotificationsRequest());
  } catch (e) {
    yield put(actions.authError({ errorMessage: e.message }));
  }
}

function* logout() {
  localStorage.removeItem('token');
  document.location.reload();
}

function* watchAuthUserRequest() {
  yield takeLatest(actions.Types.AUTH_USER_REQUEST, authUser);
}

function* watchLoadUserRequest() {
  yield takeLatest(actions.Types.LOAD_USER_REQUEST, loadUser);
}

function* watchLogout() {
  yield takeLatest(actions.Types.LOGOUT_REQUEST, logout);
}

export default [
  fork(watchAuthUserRequest),
  fork(watchLogout),
  fork(watchLoadUserRequest),
];
