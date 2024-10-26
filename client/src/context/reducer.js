function reducer(currentState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...currentState,
        todos: [...currentState.todos, action.payload],
      };
    default:
      break;
  }
}

export default reducer;
