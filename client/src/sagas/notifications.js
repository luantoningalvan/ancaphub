import {
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/notifications';
import * as api from '../api/notifications';
import { addAlert } from '../actions/alerts';

function* getNotifications() {
  try {
    const notifications = yield call(api.getNotifications);
    yield put(actions.getNotificationsSuccess(notifications.data));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* watchGetNotifications() {
  yield takeLatest(actions.Types.GET_NOTIFICATIONS_REQUEST, getNotifications);
}

function* markAllAsRead() {
  try {
    const notifications = yield call(api.markAllAsRead);
    yield put(actions.markAllAsReadSuccess(notifications.data));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* watchMarkAllAsRead() {
  yield takeLatest(actions.Types.GET_NOTIFICATIONS_REQUEST, markAllAsRead);
}

export default [
  fork(watchGetNotifications),
  fork(watchMarkAllAsRead),
];
