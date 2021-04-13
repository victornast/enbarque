import api from './api';

export const signIn = async (data) => {
  const response = await api.post('/auth/signin', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signUp = async (data) => {
  const response = await api.post('/auth/signup', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signOut = async () => {
  await api.post('/auth/signout');
};

export const verify = async () => {
  const response = await api.get('/auth/verify');
  return response.data.user;
};
