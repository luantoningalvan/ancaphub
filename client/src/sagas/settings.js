import {
  takeLatest, call, fork, put,
} from 'redux-saga/effects';

import * as actions from '../actions/settings';
import * as api from '../api/settings';

function* updateUsername(action) {
  try {
    const response = yield call(api.updateUsername, action.payload);
    yield put(actions.updateUsernameSuccess(response.data));
  } catch (e) {
    yield put(actions.settingsError({ errorMessage: e.message }));
  }
}

function* updateEmail(action) {
  try {
    const response = yield call(api.updateEmail, action.payload);
    yield put(actions.updateEmailSuccess(response.data));
  } catch (e) {
    yield put(actions.settingsError({ errorMessage: e.message }));
  }
}

function* updatePassword(action) {
  try {
    const response = yield call(api.updatePassword, action.payload);
    yield put(actions.updatePasswordSuccess(response.data));
  } catch (e) {
    yield put(actions.settingsError({ errorMessage: e.message }));
  }
}

function* updateGeolocation(action) {
  try {
    const response = yield call(api.updateGeoLocation, action.payload);
    yield put(actions.updateGeoLocationsSuccess(response.data));
  } catch (e) {
    yield put(actions.settingsError({ errorMessage: e.message }));
  }
}

function* watchUpdateUsername() {
  yield takeLatest(actions.Types.UPDATE_USERNAME_REQUEST, updateUsername);
}

function* watchUpdateEmail() {
  yield takeLatest(actions.Types.UPDATE_EMAIL_REQUEST, updateEmail);
}

function* watchUpdatePassword() {
  yield takeLatest(actions.Types.UPDATE_PASSWORD_REQUEST, updatePassword);
}

function* watchUpdateGeolocation() {
  yield takeLatest(actions.Types.UPDATE_GEOLOCATION_REQUEST, updateGeolocation);
}

export default [
  fork(watchUpdateUsername),
  fork(watchUpdateEmail),
  fork(watchUpdatePassword),
  fork(watchUpdateGeolocation),
];
