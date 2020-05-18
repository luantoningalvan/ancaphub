import axios from './axios';

export const searchTerm = (term) => axios.post('/search', { query: term });
export const serachNearbyUsers = (data) => axios.post('/search/nearby', data);
