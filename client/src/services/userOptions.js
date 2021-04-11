import api from "./api";

export const getLevelOptions = async (id) => {
  const response = await api.get(`/corp/${id}/levels`);
  return response.data.levels;
};

export const getPositionOptions = async (id) => {
  const response = await api.get(`/corp/${id}/positions`);
  return response.data.positions;
};

export const getRoleOptions = async (id) => {
  const response = await api.get(`/corp/${id}/roles`);
  return response.data.roles;
};
