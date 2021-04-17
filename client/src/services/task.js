import api from './api';

export const createTask = async (data) => {
  console.log('data: ', data);
  const response = await api.post('/tasks/create', data);
  console.log('response: ', response);
  const body = response.data;
  const createdTask = body.createdTask;
  return createdTask;
};

export const findTasks = async () => {
  const response = await api.get('/tasks');

  console.log('response.data: ', response.data);
  return response.data;
};

export const loadTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  const task = response.data.task;
  return task;
};
