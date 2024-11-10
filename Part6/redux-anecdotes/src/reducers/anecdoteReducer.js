// Legacy Code

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE": {
//       const id = action.payload.id;
//       const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
//       const votedAnecDote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : votedAnecDote
//       );
//     }
//     case "ADD_NEW_ANECDOTE":
//       return state.concat(action.payload);
//     default:
//       return state;
//   }
// };

// export const addNewAnecdoteAction = (content) => {
//   return {
//     type: "ADD_NEW_ANECDOTE",
//     payload: {
//       content,
//       votes: 0,
//       id: getId(),
//     },
//   };
// };

// export const voteThisAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     payload: {
//       id,
//     },
//   };
// };

// export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdotes";

const initialState = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    voteThisAnecdote(state, action) {
      const anecdote = action.payload;
      return state.map((notes) =>
        notes.id !== anecdote.id ? notes : anecdote
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteThisAnecdote, appendAnecdote, setAnecdotes } =
  noteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdoteThunk = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default noteSlice.reducer;
