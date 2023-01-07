let initialState = {
  message: "",
  color: "",
  display: false,
};

export default function messageBoxReducer(state = initialState, action) {
  switch (action.type) {
    case "DISPLAY_MESSAGE_BOX":
      return (state = action.payload);
    case "HIDE_MESSAGE_BOX":
      return (state = initialState);
    default:
      return state;
  }
}
