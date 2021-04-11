import api from "./api";

export const addUser = async (data) => {
  const response = await api.post(`/user/create`);
  return response.data.user;
};
