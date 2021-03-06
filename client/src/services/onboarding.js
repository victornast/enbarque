import api from './api';

export const createOnboarding = async (data) => {
  const response = await api.post('/onboarding/create', data);
  return response.data.onboardingProcess;
};

export const findPlans = async () => {
  const response = await api.get('/onboarding');
  return response.data.onboardingProcessPlans;
};

// The id is the user's id at the moment
export const getProcess = async (id) => {
  const response = await api.get(`/onboarding/${id}`);
  if (response) {
    return response.data.process;
  } else {
    return console.log(
      'There was no onboarding process found with this user'
    );
  }
};

export const editProcess = async (processId, data) => {
  const response = await api.patch(`/onboarding/${processId}`, data);
  return response.data.updatedProcess;
};

export const scheduleTask = async (
  processId,
  taskId,
  date,
  newBacklogList
) => {
  const data = {
    scheduledTasks: { task: taskId, startingTimeSlot: date },
    unscheduledTasks: newBacklogList
  };
  const response = await api.patch(`/onboarding/${processId}`, data);
  //console.log("client side response:", response.data.updatedProcess);
  return response.data.updatedProcess;
};

export const addBacklogTask = async (processId, taskId) => {
  const response = await api.patch(
    `/onboarding/${processId}/backlog/${taskId}`,
    taskId
  );
  return response.data.updatedProcess;
};

export const changeTaskStatus = async (processId, task) => {
  const response = await api.patch(
    `/onboarding/${processId}/status`,
    task
  );
  return response.data.updatedProcess;
};

export const getMenteeList = async (id) => {
  const response = await api.get(`/onboarding/${id}/mentees`);
  return response.data.processes;
};

export const sendFeedback = async (data) => {
  const response = await api.post('/feedback', data);
  return response.data.feedbackMessage;
};

export const getFeedback = async (processId) => {
  const response = await api.get(`/feedback/${processId}`);
  return response.data.feedbackMessages;
};
