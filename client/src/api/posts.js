import axios from './axios';

export const createPost = (data) => axios.post('/posts', data);
export const getFeedPosts = () => axios.get('/posts/auth/feed');
export const getUserPosts = (data) => axios.get(`/posts/user/${data}`);
