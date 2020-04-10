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
import { getUsersCount } from '../actions/users'
import { getUsersRelationsips } from '../actions/relationships'

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message ));
  }
}

function* getSingleUser(action) {
  try {
    const user = yield call(() => api.getSingleUser(action.payload));
    yield put(getUsersCount([{user: user.data}]));
    yield put(getUsersRelationsips([{user: user.data}]));
    yield put(actions.getSingleUserSuccess(user.data));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message ));
  }
}

function* getUserFollowers(action) {
  try {
    const users = yield call(() => api.getUserFollowers(action.payload));
    yield put(getUsersCount(users.data));
    yield put(getUsersRelationsips(users.data));
    yield put(actions.getUserFollowersSuccess(users.data));
  } catch (e) {
    yield put(alerts.addAlert('error', e.message ));
  }
}

function* getUserFollowing(action) {
  try {
    const users = yield call(() => api.getUserFollowing(action.payload));
    yield put(getUsersCount(users.data));
    yield put(getUsersRelationsips(users.data));
    yield put(actions.getUserFollowingSuccess(users.data));
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

function* whatchGetSingleUser() {
  yield takeLatest(actions.Types.GET_SINGLE_USER_REQUEST, getSingleUser);
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* watchGetUserFollowers() {
  yield takeLatest(actions.Types.GET_USER_FOLLOWERS_REQUEST, getUserFollowers);
}

function* watchGetUserFollowing() {
  yield takeLatest(actions.Types.GET_USER_FOLLOWING_REQUEST, getUserFollowing);
}

export default [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(whatchGetSingleUser),
  fork(watchGetUserFollowers),
  fork(watchGetUserFollowing)
];
