
import { configureStore } from "@reduxjs/toolkit";
import appliedJobsReducer from "../slices/JobSlice";

export const store = configureStore({
  reducer: {
    jobsApplied: appliedJobsReducer, 
  },
});