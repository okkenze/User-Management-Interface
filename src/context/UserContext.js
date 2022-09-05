import { createContext, useReducer } from "react";

export const UsersContext = createContext();
export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    // case "CREATE_WORKOUT":
    //   return {
    //     workouts: [action.payload, ...state.workouts],
    //   };
    case "DELETE_USER":
      return {
        users: state.users.filter((w) => w.id !== action.payload.id),
      };
    case "UPDATE_USER":
      return {
        users: state.users.filter((w) => w.id !== action.payload.id),
      };

    // case "SINGLE_WORKOUT":
    //   return {
    //     workouts: state.workouts.filter((w) => w._id !== action.payload._id),
    //   };

    default:
      return state;
  }
};
export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: null,
  });

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
