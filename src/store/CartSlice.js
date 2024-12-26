import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      let exist = state.find((value) => value.id === action.payload.id);

      if (exist) {
        exist.choiseCount += +action.payload.choiseCount;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      state.filter((value) => value.id != action.payload.id);
    },

    update: (state, action) => {
      state.map((value) => {
        if (
          value.id == action.payload.id &&
          action.payload.color == value.color
        ) {
          value.count += action.payload.count;
        }
        return value;
      });
      const updatedItem = action.payload;
      const index = state.findIndex(
        (item) => item.data.id === updatedItem.data.id
      );
      if (index !== -1) {
        state[index] = updatedItem;
      }
    },

    clear: (state, action) => {
      state = [];
    },
  },
});

export default cartSlice.reducer;
export const { add, remove, update, clear } = cartSlice.actions;
