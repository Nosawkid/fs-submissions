import { newAnecdoteThunk } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  clearNotification,
  createdAnecdote,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNewAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(newAnecdoteThunk(anecdote));
    dispatch(createdAnecdote(anecdote));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };
  return (
    <div>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
