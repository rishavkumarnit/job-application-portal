import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appliedJobs: [],
};

export const jobSlice = createSlice({
  name: "jobsApplied",
  initialState,
  reducers: {
    addAppliedJob: (state, action) => {
      state.appliedJobs.push(action.payload);
    },
    editAppliedJob: (state, action) => {
      const newappliedJob = action.payload;
      const index = state.appliedJobs.findIndex(
        (item) => item.id === newappliedJob.id
      );

      if (index !== -1) {
        state.appliedJobs[index] = newappliedJob;
      } else {
        state.appliedJobs.push(newappliedJob);
      }
    },
    deleteAppliedJob: (state, action) => {
      state.appliedJobs = state.appliedJobs.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addAppliedJob } = jobSlice.actions;

export default jobSlice.reducer;
