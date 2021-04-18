import api from "./api";

export const createOnboarding = async (data) => {
  const response = await api.post("/onboarding/create", data);
  return response.data.onboardingProcess;
};

export const findPlans = async () => {
  const response = await api.get("/onboarding");
  return response.data.onboardingProcessPlans;
};

// The id is the user's id at the moment
export const getProcess = async (id) => {
  const response = await api.get(`/onboarding/${id}`);
  if (response) {
    console.log(response);
    return response.data.process;
  } else {
    return console.log("There was no onboarding process found with this user");
  }
};

export const editProcess = async (processId, data) => {
  const response = await api.patch(`/onboarding/${processId}`, data);
  console.log("response", response);
  return response.data.updatedProcess;
};
