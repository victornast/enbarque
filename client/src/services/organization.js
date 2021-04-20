import api from "./api";

export const findUsers = async () => {
  const response = await api.get("/corp/users");
  return response.data.users;
};

export const findMentors = async (positionId) => {
  const response = await api.get(`/corp/users/${positionId}`);
  return response.data.mentors;
};
