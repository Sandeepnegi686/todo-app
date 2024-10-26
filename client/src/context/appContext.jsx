import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { ADD_TODO, CHANGE_TODO_VALUE, initialState } from "./action";

const appContext = createContext();

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialState);

  //   async function getTodos(){
  //     await
  //   }

  function addTodo(title) {
    const todoData = { title: title, status: "pending", id: Date.now() };
    dispatch({ type: ADD_TODO, payload: todoData });
  }

  function onChangeHandleTodo(value) {
    dispatch({ type: CHANGE_TODO_VALUE, payload: value });
    console.log(value);
  }

  return (
    <appContext.Provider
      value={{
        ...state,
        addTodo,
        onChangeHandleTodo,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(appContext);
};

export { AppProvider };
