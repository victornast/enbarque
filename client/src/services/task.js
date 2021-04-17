import api from './api';

export const createTask = async (data) => {
  console.log('data: ', data);
  const response = await api.post('/task/create', data);
  console.log('response: ', response);
  const body = response.data;
  const createdTask = body.createdTask;
  return createdTask;
};

export const findTasks = async () => {
  const response = await api.get('/task');

  console.log('response.data: ', response.data);
  return response.data;
};
