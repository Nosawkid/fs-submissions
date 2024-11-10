import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addNewAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const voteAnecdote = async (id) => {
  const anecdoteToVote = (await axios.get(`${baseUrl}/${id}`)).data;
  const updatedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};
