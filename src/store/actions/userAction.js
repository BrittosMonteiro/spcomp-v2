export const setUserAction = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const removeUserAction = () => {
  return {
    type: "REMOVE_USER",
  };
};
