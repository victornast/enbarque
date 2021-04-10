import {
  getLevelOptions,
  getPositionOptions,
  getRoleOptions,
} from "./services/userOptions";

// Need a organization id to be passed
export const levelOptions = async () => {
  const responseObjects = await getLevelOptions();
  const levels = responseObjects.map((levelObject) =>
    levels.push(levelObject.name)
  );
  return levels;
};

export const positionOptions = async () => {
  const responseObjects = await getPositionOptions();
  const positions = responseObjects.map((positionObject) =>
    positions.push(positionObject.name)
  );
  return positions;
};

export const roleOptions = async () => {
  const responseObjects = await getRoleOptions();
  const roles = responseObjects.map((roleObject) =>
    roles.push(roleObject.name)
  );
  return roles;
};
