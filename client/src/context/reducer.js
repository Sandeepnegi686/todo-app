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
    default:
      break;
  }
}

export default reducer;
