import {
  takeEvery,
  putResolve,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/posts';
import * as api from '../api/posts';
import { getUsersCount } from '../actions/users'
import { getUsersRelationsips } from '../actions/relationships'

function* createPost(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    yield put(actions.createPostSuccess(post.data));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* getPosts() {
  try {
    const posts = yield call(api.getFeedPosts);
    yield put(actions.getPostsSuccess({ items: posts.data }));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}

function* likePost(action) {
  try {
    const likedPost = yield call(() => api.likePost(action.payload));
    yield put(actions.likePostSuccess(likedPost.data));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}

function* getPostLikes(action) {
  try {
    const post = yield call(() => api.getLikes(action.payload));
    yield putResolve(getUsersCount(post.data.likes));
    yield putResolve(getUsersRelationsips(post.data.likes));
    yield put(actions.getPostLikesSuccess(post.data));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}


function* getUserPosts(action) {
  try {
    const posts = yield call(api.getUserPosts, action.payload);
    yield put(actions.getUserPostsSuccess({ userFeedItems: posts.data }));
  } catch (e) {
    yield put(actions.getUserPostsError({ errorMessage: e.message }));
  }
}

function* watchGetUserPostsRequest() {
  yield takeLatest(actions.Types.GET_USER_POSTS_REQUEST, getUserPosts);
}

function* watchGetPostsRequest() {
  yield takeEvery(actions.Types.GET_POSTS_REQUEST, getPosts);
}

function* watchCreatePostRequest() {
  yield takeLatest(actions.Types.CREATE_POST_REQUEST, createPost);
}

function* watchLikePostRequest() {
  yield takeLatest(actions.Types.LIKE_POST_REQUEST, likePost);
}

function* watchGetLikesRequest() {
  yield takeLatest(actions.Types.GET_POST_LIKE_REQUEST, getPostLikes);
}

export default [
  fork(watchCreatePostRequest),
  fork(watchGetPostsRequest),
  fork(watchGetUserPostsRequest),
  fork(watchLikePostRequest),
  fork(watchGetLikesRequest)
];
