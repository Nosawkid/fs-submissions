import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, voteAnecdote } from "./components/requests";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const anecdotes = result.data;

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  console.log(JSON.parse(JSON.stringify(result)));

  const handleVote = (id) => {
    const anecdote = anecdotes.find((note) => note.id === id);

    voteAnecdoteMutation.mutate(id, {
      onSuccess: () =>
        notificationDispatch({ type: "VOTE", payload: anecdote.content }),
    });
  };

  if (result.isLoading) {
    return <div>Data is being fetched from the server</div>;
  }

  if (result.isError) {
    return <dir>Error Fetching Data from the server</dir>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
