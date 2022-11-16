let initialState = {
  id: null,
  token: null,
  username: null,
  viewAs: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      const { id, token, username, viewAs } = action.payload;
      state.id = id;
      state.token = token;
      state.username = username;
      state.viewAs = viewAs;
      return state;
    case "REMOVE_USER":
      return (state = initialState);
    default:
      return state;
  }
};

export default userReducer;
