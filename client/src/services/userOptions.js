import api from "./api";

export const getLevelOptions = async () => {
  try {
    const response = await api.get(`/corp/levels`); //id of the user at the moment
    // console.log(response);
    const levels = [];
    response.data.levels.map((level) => levels.push(level));
    // console.log(levels);
    return levels;
  } catch (error) {
    return new Error("There was an error getting levels");
  }
};

export const getPositionOptions = async () => {
  try {
    const response = await api.get(`/corp/positions`); //id of the user at the moment
    const positions = [];
    response.data.positions.map((position) => positions.push(position));
    // console.log(positions);
    return positions;
  } catch (error) {
    return new Error("There was an error getting positions");
  }
};

export const getRoleOptions = async () => {
  try {
    const response = await api.get(`/corp/roles`); //id of the user at the moment
    const roles = [];
    response.data.roles.map((role) => roles.push(role));
    // console.log(roles);
    return roles;
  } catch (error) {
    return new Error("There was an error getting roles");
  }
};
