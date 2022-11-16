const initialState = {
  load: false,
};

export const loadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return (state.load = action.payload);
    default:
      return state;
  }
};
