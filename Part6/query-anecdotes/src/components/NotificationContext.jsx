import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `anecdote '${action.payload}' voted`;
    case "ADD":
      return "New Anecdote added";
    case "CLEAR":
      return "";
    case "FAIL":
      return "Too Short Anecdote, must be at least 5 characters long";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationValue must be used within a NotificationContextProvider"
    );
  }
  return context.notification;
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationContextProvider"
    );
  }
  return context.notificationDispatch;
};

export default NotificationContext;
