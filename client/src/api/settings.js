import axios from './axios';

export const updateUsername = (data) => axios.patch('/users/username', data);
export const updateEmail = (data) => axios.patch('/users/email', data);
export const updatePassword = (data) => axios.patch(`/users/password`, data);
