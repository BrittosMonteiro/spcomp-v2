import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer.js";
import messageBoxReducer from "./reducers/messageBoxReducer.js";

const combinedReducers = combineReducers({
  login: userReducer,
  messageBox: messageBoxReducer,
});

const store = createStore(combinedReducers);

export default store;
