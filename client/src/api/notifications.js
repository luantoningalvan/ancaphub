import axios from './axios';

export const getNotifications = () => axios.get(`/notifications`);
export const markAllAsRead = () => axios.put(`/notifications/markallasread`);
