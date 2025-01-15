import { createStore, combineReducers } from "redux";  // Import combineReducers from redux
import { taskReducer, userReducer } from "./reducers";  // Import your task and user reducers

// Combine the reducers into a rootReducer
const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
});

// Create the Redux store using rootReducer
const store = createStore(rootReducer);

export default store;
