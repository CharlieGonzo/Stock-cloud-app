import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setter: (state, action) => {
      console.log("here" + " " + action.payload)
      state.value = action.payload;
    }
  },
});

export const { setter } = tokenSlice.actions;

export default tokenSlice.reducer;
