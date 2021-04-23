import api from './api';

export const createTask = async (data) => {
  const response = await api.post('/tasks/create', data);
  const body = response.data;
  const createdTask = body.createdTask;
  return createdTask;
};

export const updateTask = async (id, data) => {
  const response = await api.patch(`/tasks/${id}/edit`, data);
  return response;
};

export const findTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.allTasks;
};

export const loadTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  const task = response.data.task;
  return task;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}/delete`);
  return response;
};
