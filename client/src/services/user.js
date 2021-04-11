import api from './api';

export const addUser = async (data) => {
  const response = await api.post(`/user/create`, data);
  return response.data.user;
};
