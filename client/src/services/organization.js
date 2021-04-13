import api from "./api";

export const findUsers = async () => {
  const response = await api.get("/corp/users");
  return response.data.users;
};
