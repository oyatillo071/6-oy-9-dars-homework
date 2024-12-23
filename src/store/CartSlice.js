import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((item) => item.data.id !== action.payload.id);
    },
  },
});

export default cartSlice.reducer;
export const { add, remove } = cartSlice.actions;
