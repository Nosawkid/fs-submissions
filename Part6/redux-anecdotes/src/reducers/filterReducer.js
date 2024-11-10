import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterReducer(state, action) {
      return action.payload;
    },
  },
});

export const { filterReducer } = filterSlice.actions;
export default filterSlice.reducer;

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "FILTER_ANECDOTES":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export default filterReducer;
