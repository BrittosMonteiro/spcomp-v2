let initialState = {
  isLogged: false,
  token: "",
  username: "",
};

export default function userSessionReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return (state = action.payload);

    case "UNSET_USER":
      return (state = initialState);

    default:
      return state;
  }
}
