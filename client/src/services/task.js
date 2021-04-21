import api from "./api";

export const createTask = async (data) => {
  console.log("data: ", data);
  const response = await api.post("/tasks/create", data);
  console.log("response: ", response);
  const body = response.data;
  const createdTask = body.createdTask;
  return createdTask;
};

export const updateTask = async (id, data) => {
  console.log("data: ", data);
  console.log("id: ", id);
  const response = await api.patch(`/tasks/${id}/edit`, data);
  return response;
};

export const findTasks = async () => {
  const response = await api.get("/tasks");

  console.log("response.data: ", response.data);
  return response.data.allTasks;
};

export const loadTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  const task = response.data.task;
  return task;
};

//is this correct?
export const deleteTask = async (id) => {
  console.log("api endpoint for delete task has been called");
  const response = await api.delete(`/tasks/${id}/delete`);
  return response;
};
