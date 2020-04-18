import axios from './axios';

export const getLibraryItems = (params) => axios.get('/library', { params });
export const getSingleLibraryItem = (data) => axios.get(`/library/${data.itemId}`);
export const createLibraryItem = (data) => axios.post('/library', data);
export const getRecentLibraryItems = () => axios.get('/library?pageSize=3&orderBy=desc', {});
