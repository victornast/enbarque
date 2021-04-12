import api from "./api";

export const getLevelOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/levels`); //id of the user at the moment
    // console.log(response);
    const levels = [];
    response.data.levels.map((level) => levels.push(level.name));
    // console.log(levels);
    return levels;
  } catch (error) {
    return new Error("There was an error getting levels");
  }
};

export const getPositionOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/positions`); //id of the user at the moment
    const positions = [];
    response.data.positions.map((position) => positions.push(position.name));
    console.log(positions);
    return positions;
  } catch (error) {
    return new Error("There was an error getting positions");
  }
};

export const getRoleOptions = async (id) => {
  try {
    const response = await api.get(`/corp/${id}/roles`); //id of the user at the moment
    const roles = [];
    response.data.roles.map((role) => roles.push(role.name));
    console.log(roles);
    return roles;
  } catch (error) {
    return new Error("There was an error getting roles");
  }
};
