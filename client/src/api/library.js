import axios from './axios';

export const getLibraryItems = () => axios.get('/library');
export const getSingleLibraryItem = (data) => axios.get(`/library/${data.itemId}`);
export const createLibraryItem = (data) => axios.post('/library', data);
