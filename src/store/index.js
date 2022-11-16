import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer.js";
import counterReducer from "./reducers/counterReducer.js";

const combinedReducers = combineReducers({
  userReducer,
  counterReducer,
});

const store = createStore(combinedReducers);

export default store;
