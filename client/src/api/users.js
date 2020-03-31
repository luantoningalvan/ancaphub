import axios from './axios';

export const getUsers = () => axios.get('/users', {
  params: {
    limit: 100,
  },
});

export const createUser = ({
  name, username, email, password,
}) => axios.post('/users', {
  name,
  username,
  email,
  password,
});
