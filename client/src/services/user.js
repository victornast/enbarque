import api from './api';

export const addUser = async (data) => {
  // console.log("from user.js", data);
  const response = await api.post(`/user/create`, data);

  // console.log(response.data.newUser);
  return response.data.newUser;
};

export const loadUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data.user;
};

export const loadUserWithToken = async (token) => {
  // console.log("token to be sent", token);
  const response = await api.get(`/user/welcome/${token}`);
  // console.log(response);
  return response.data.user;
};

export const updateUser = async (id, data) => {
  // console.log("in updateUser:", id, data);
  const response = await api.patch(`/user/${id}`, data);
  return response.data.user;
};
