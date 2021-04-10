import api from './api';

export const signIn = async data => {
  const response = await api.post('/authentication/signin', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signUp = async data => {
  const response = await api.post('/authentication/signup', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signOut = async () => {
  await api.post('/authentication/signout');
};

export const verify = async () => {
  const response = await api.get('/authentication/verify');
  return response.data.user;
};
