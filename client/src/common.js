import {
  getLevelOptions,
  getPositionOptions,
  getRoleOptions,
} from "./services/userOptions";

// Need a organization id to be passed?
export const levelOptions = async () => {
  const responseObjects = await getLevelOptions();
  let levels = responseObjects.data.levels.map((levelObject) =>
    levels.push(levelObject.name)
  );
  return levels;
};

export const positionOptions = async () => {
  const responseObjects = await getPositionOptions();
  let positions = responseObjects.data.postitions.map((positionObject) =>
    positions.push(positionObject.name)
  );
  return positions;
};

export const roleOptions = async () => {
  const responseObjects = await getRoleOptions();
  const roles = responseObjects.roles.map((roleObject) =>
    roles.push(roleObject.name)
  );
  return roles;
};
