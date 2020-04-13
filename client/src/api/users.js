import axios from './axios';

export const getUsers = () => axios.get('/users', {
  params: {
    limit: 100,
  },
});

export const getSingleUser = (payload) => axios.get(`users/${payload}`);

export const followUser = (payload) => axios.post(`users/${payload}/follow`);
export const unfollowUser = (payload) => axios.post(`users/${payload}/unfollow`);
export const getUserFollowers = (payload) => axios.get(`users/${payload}/followers`);
export const getUserFollowing = (payload) => axios.get(`users/${payload}/following`);

export const createUser = ({
  name, username, email, password,code
}) => axios.post('/users', {
  name,
  username,
  email,
  password,
  code
});

export const updateUserInfo = ({
  name, bio, birthday, currentCity, site
}) => axios.put('/users/profile', {
  name, bio, birthday, currentCity, site
});

export const updateUserAvatar = (data) => axios.post('/users/avatar', data);