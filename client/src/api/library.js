import axios from './axios';

export const getLibraryItems = () => axios.get('/library');
export const getAllBooks = ({ currentPage }) => axios.get(`/library?type=book&pageSize=10&currentPage=${currentPage}`);
export const getAllArticles = ({ currentPage }) => axios.get(`/library?type=article&pageSize=10&currentPage=${currentPage}`);
export const getAllVideos = ({ currentPage }) => axios.get(`/library?type=video&pageSize=10&currentPage=${currentPage}`);
export const getSingleLibraryItem = (data) => axios.get(`/library/${data.itemId}`);
export const createLibraryItem = (data) => axios.post('/library', data);
