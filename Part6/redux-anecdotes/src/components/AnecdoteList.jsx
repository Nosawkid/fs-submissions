import { useSelector, useDispatch } from "react-redux";
import { voteThisAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  notificationThunk,
  votedAnAnecdote,
} from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const voteAnecdote = async (id) => {
    const voteAnecdote = await anecdoteServices.voteAnecdote(id);
    dispatch(voteThisAnecdote(voteAnecdote));
    const votedAnecdote = anecdotes.find((note) => note.id === id);
    dispatch(notificationThunk(voteAnecdote.content));
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;
