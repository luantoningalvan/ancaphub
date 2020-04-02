import axios from './axios';

export const authUser = ({
  email, password
}) => axios.post('/auth', {
  email,
  password
});


export const loadUser = () => axios.get('/auth');
