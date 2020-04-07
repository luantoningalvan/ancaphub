import axios from './axios';

export const getLibraryItems = () => axios.get('/library');
export const getSingleLibraryItem = (itemId) => axios.get(`/library/${itemId}`);
export const createLibraryItem = (data) => axios.post('/library', data);
