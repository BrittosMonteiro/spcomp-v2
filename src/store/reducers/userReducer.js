let initialState = {
  id: null,
  token: null,
  username: null,
  viewAs: null,
  firstName: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      const { firstName, id, token, username, viewAs } = action.payload;
      state.id = id;
      state.token = token;
      state.username = username;
      state.viewAs = viewAs;
      state.firstName = firstName;
      return state;
    case "REMOVE_USER":
      return (state = initialState);
    default:
      return state;
  }
};

export default userReducer;
