import { addNewAnecdote } from "./requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const useNotification = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    onError: () => useNotification({ type: "FAIL" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      useNotification({ type: "ADD" });
      setTimeout(() => {
        useNotification({ type: "CLEAR" });
      }, 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
