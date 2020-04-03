import axios from './axios';

export const createPost = (data) => axios.post('/posts', data);
