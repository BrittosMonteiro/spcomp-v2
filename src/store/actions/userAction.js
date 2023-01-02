export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const unsetUSer = () => {
  return {
    type: "UNSET_USER",
  };
};
