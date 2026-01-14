import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slicer/authSlicer";
import taskReducer from "../slicer/taskSlicer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:taskReducer,
  },
});

export default store;
