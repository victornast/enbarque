import api from "./api";

export const getLevelOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/levels`);
    const levels = response.data.levels.map((level) => levels.push(level.name));
    return levels;
  } catch (error) {
    return new Error("There was an error getting levels");
  }
};

export const getPositionOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/positions`);
    const positions = response.data.positions.map((position) =>
      positions.push(position.name)
    );
    return positions;
  } catch (error) {
    return new Error("There was an error getting positions");
  }
};

export const getRoleOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/roles`);
    const roles = response.data.roles.map((role) => roles.push(role.name));
    return roles;
  } catch (error) {
    return new Error("There was an error getting roles");
  }
};
