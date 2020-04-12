import axios from './axios';

export const createPost = (data) => axios.post('/posts', data);
export const likePost = (postId) => axios.post(`posts/${postId}/like`);
export const getLikes = (postId) => axios.get(`posts/${postId}/likes`);
export const getFeedPosts = () => axios.get('/posts/auth/feed');
export const getUserPosts = (data) => axios.get(`/posts/user/${data}`);
export const votePostPoll = (data) => axios.post(`/posts/${data.pollId}/vote`, { vote: data.option });
