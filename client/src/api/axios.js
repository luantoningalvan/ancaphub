import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL 
    ? process.env.REACT_APP_API_URL + "/api"
    : 'http://localhost:3333/api',
});
