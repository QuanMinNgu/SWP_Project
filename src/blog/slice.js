import { createSlice } from "@reduxjs/toolkit";

const blogSLice = createSlice({
  name: "blog",
  initialState: {
    react: false,
    countReact: 0,
  },
  reducers: {
    addLove(state, actions) {
      state.react = true;
      state.countReact = state.countReact + 1;
    },
    removeLove(state, actions) {
      state.react = false;
      state.countReact = state.countReact - 1;
    },
  },
});

const { reducer, actions } = blogSLice;
export const { addLove, removeLove } = actions;
export default reducer;
