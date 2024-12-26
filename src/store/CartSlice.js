import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      let exist = state.find((value) => value.id === action.payload.data.id);

      if (exist) {
        exist.count += action.count;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.data.id !== action.payload.id);
    },
    update: (state, action) => {
      const updatedItem = action.payload;
      const index = state.findIndex(
        (item) => item.data.id === updatedItem.data.id
      );
      if (index !== -1) {
        state[index] = updatedItem;
      }
    },

    clear: () => {},
  },
});

export default cartSlice.reducer;
export const { add, remove, update, clear } = cartSlice.actions;
