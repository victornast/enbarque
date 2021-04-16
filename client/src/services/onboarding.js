import api from "./api";

export const createOnboarding = async (data) => {
  const response = await api.post("/onboarding/create", data);
  return response.data.onboardingProcess;
};

export const findPlans = async () => {
  const response = await api.get("/onboarding");
  return response.data.onboardingProcessPlans;
};
