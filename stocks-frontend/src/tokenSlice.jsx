import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducer: {
    setter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default tokenSlice.reducer;
