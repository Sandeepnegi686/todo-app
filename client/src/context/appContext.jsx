import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import { redirect } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  initialState,
  LOGIN_USER,
  LOGOUT_USER,
  SET_TODO_IN_STATE,
  SIGNUP_USER,
} from "./action";

const appContext = createContext();
const serverURL = import.meta.env.VITE_SERVER_URL;

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //baseURL: `${serverURL}/v1/api/`,
  
  const authFetch = axios.create({
    baseURL: '/v1/api/',
    headers: { Authorization: `Bearer ${state.token}` },
  });

  //request
  authFetch.interceptors.request.use(
    function (config) {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.data.message === "Email already exist") {
        return Promise.reject(error);
      }
      if (error.response.status == 400) {
        logoutUser();
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  // eslint-disable-next-line no-unused-vars
  function addUserToLocalStorage({ user, token }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
  }

  // eslint-disable-next-line no-unused-vars
  function removerUserFromLocalStorage() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  //Add a Todo to Local Storage
  function addTodosToLocalStorrage(todo) {
    const todos =
      JSON.parse(localStorage.getItem("todos")).length > 0
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //Remove Todo From local Storage
  function removeTodosFromLocalStorrage() {
    localStorage.removeItem("todos");
  }

  //Edit & Delete a todo from Local Storage
  function editAndDeleteTodoFromLocalStorage(updatedTodo, string) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos.length > 0) {
      if (string === "edit") {
        todos.forEach((todo) => {
          if (todo._id === updatedTodo._id) {
            todo.status = "completed";
          }
        });
      } else if (string === "delete") {
        todos = todos.filter((todo) => todo._id !== updatedTodo._id);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  //Get Todo from Database
  async function getTodos(id) {
    try {
      const res = await authFetch.get("/todo", { createdBy: id });
      dispatch({ type: SET_TODO_IN_STATE, payload: res.data.todos });
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Add a todo to database
  async function addTodo(title) {
    try {
      const res = await authFetch.post("/todo", {
        title,
      });
      dispatch({ type: ADD_TODO, payload: res.data.todo });
      addTodosToLocalStorrage(res.data.todo);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  //Delete a todo from database & from localstorgae
  async function deleteTodo(id) {
    const todo = { _id: id };
    try {
      const res = await authFetch.delete(`/todo/${id}`);
      dispatch({ type: DELETE_TODO, payload: id });
      editAndDeleteTodoFromLocalStorage(todo, "delete");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Edit a todo from database & from localstorgae
  async function editTodo(id) {
    try {
      const res = await authFetch.patch(`/todo/${id}`);
      dispatch({ type: EDIT_TODO, payload: id });
      editAndDeleteTodoFromLocalStorage(res.data.todo, "edit");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function loginUser(value) {
    try {
      const res = await authFetch.post("/user/login", value);
      const data = await res.data;
      const user = data.user;
      const token = data.token;
      const todos = data.todos;
      addUserToLocalStorage({ user, token });
      localStorage.setItem("todos", JSON.stringify(todos));
      dispatch({ type: LOGIN_USER, payload: data });
      toast.success(data.message);
      redirect("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function signUpUser(data) {
    try {
      const res = await authFetch.post("/user/register", data);
      const d = await res.data;
      const { user, token } = d;
      addUserToLocalStorage({ user, token });
      localStorage.setItem("todos", JSON.stringify([]));
      dispatch({ type: SIGNUP_USER, payload: d });
      redirect("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function logoutUser() {
    dispatch({ type: LOGOUT_USER });
    removerUserFromLocalStorage();
    removeTodosFromLocalStorrage();
    toast.success("User logout");
  }

  return (
    <appContext.Provider
      value={{
        ...state,
        addTodo,
        deleteTodo,
        editTodo,
        loginUser,
        signUpUser,
        logoutUser,
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
