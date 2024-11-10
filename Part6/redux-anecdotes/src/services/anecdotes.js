import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNewAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};

const voteAnecdote = async (id) => {
  const anecdoteToVote = await axios.get(`${baseUrl}/${id}`);
  const res = await axios.patch(`${baseUrl}/${id}`, {
    votes: anecdoteToVote.data.votes + 1,
  });
  return res.data;
};

export default { getAllAnecdotes, createNewAnecdote, voteAnecdote };
