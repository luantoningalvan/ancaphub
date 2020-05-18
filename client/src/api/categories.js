import axios from './axios';

export const getCategories = () => axios.get('/categories');
