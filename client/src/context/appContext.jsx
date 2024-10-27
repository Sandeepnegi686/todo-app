import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_TODO,
  CHANGE_TODO_VALUE,
  DELETE_TODO,
  EDIT_TODO,
  initialState,
  SET_TODO_IN_STATE,
} from "./action";

const appContext = createContext();
const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = `${serverURL}/v1/api`;

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line no-unused-vars
  function addTodosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // eslint-disable-next-line no-unused-vars
  function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todos")).length > 0
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
  }

  //Get Todo from Database & adding them to localstorage
  async function getTodos() {
    const res = await axios.get("/todo");
    // addTodosToLocalStorage(res.data.todos);
    dispatch({ type: SET_TODO_IN_STATE, payload: res.data.todos });
    // notify("Here is your toast.");
  }

  // function updateTodosOnState(){
  //   dispatch({ type: SET_TODO_IN_STATE, payload: res.data.todos });
  // }

  async function addTodo(todo) {
    try {
      const res = await axios.post("/todo", { title: todo });
      dispatch({ type: ADD_TODO, payload: res.data.todo });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await axios.delete(`/todo/${id}`);
      // getTodos();
      dispatch({ type: DELETE_TODO, payload: id });
      toast.success(res.data.message);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  }

  async function editTodo(id) {
    try {
      const res = await axios.patch(`/todo/${id}`);
      dispatch({ type: EDIT_TODO, payload: id });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(function () {
    getTodos();
  }, []);

  function onChangeHandleTodo(value) {
    dispatch({ type: CHANGE_TODO_VALUE, payload: value });
    console.log(value);
  }

  return (
    <appContext.Provider
      value={{
        ...state,
        addTodo,
        deleteTodo,
        editTodo,
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
