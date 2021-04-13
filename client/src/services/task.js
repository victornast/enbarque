import api from './api';

export const createTask = async (data) => {
  console.log('data: ', data);
  const response = await api.post('/task/create', data);
  console.log('response: ', response);
  const body = response.data;
  const user = body.user;
  return user;
};
