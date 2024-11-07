function reducer(currentState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...currentState,
        todos: [...currentState.todos, action.payload],
      };
    case "SET_TODO_IN_STATE":
      return {
        ...currentState,
        todos: action.payload,
      };
    case "DELETE_TODO":
      return {
        ...currentState,
        todos: currentState.todos.filter((todo) => todo._id !== action.payload),
      };
    case "EDIT_TODO":
      return {
        ...currentState,
        todos: currentState.todos.map((todo) => {
          if (todo._id === action.payload) {
            todo.status = "completed";
          }
          return todo;
        }),
      };
    case "LOGIN_USER":
      return {
        ...currentState,
        token: action.payload.token,
        user: action.payload.user,
        todos: action.payload.todos,
      };
    case "LOGOUT_USER":
      return {
        ...currentState,
        token: "",
        user: "",
        todos: [],
      };
    case "SIGNUP_USER":
      return {
        ...currentState,
        token: action.payload.token,
        user: action.payload.user,
        todos: action.payload.todos,
      };
    default:
      break;
  }
}

export default reducer;
