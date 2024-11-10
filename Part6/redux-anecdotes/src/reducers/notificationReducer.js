import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotification(state, action) {
      return "";
    },
    votedAnAnecdote(state, action) {
      return `You voted for the anecdote ${action.payload}`;
    },
    createdAnecdote(state, action) {
      return `You added a new note ${action.payload}`;
    },
  },
});

export const { votedAnAnecdote, createdAnecdote, clearNotification } =
  notificationSlice.actions;

export const notificationThunk = (anecdote) => {
  return async (dispatch) => {
    dispatch(votedAnAnecdote(anecdote));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };
};

export default notificationSlice.reducer;
