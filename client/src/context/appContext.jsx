import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import { redirect } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ADD_TODO,
  CHANGE_TODO_VALUE,
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
axios.defaults.baseURL = `${serverURL}/v1/api`;

// function redirectPath(path) {
//   setTimeout(function () {
//     redirect(path);
//   }, 500);
// }

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  //Get Todo from Database & adding them to localstorage
  async function getTodos() {
    try {
      const res = await axios.get("/todo");
      // addTodosToLocalStorage(res.data.todos);
      dispatch({ type: SET_TODO_IN_STATE, payload: res.data.todos });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function addTodo(todo, _id) {
    try {
      const res = await axios.post("/todo", { title: todo, createdBy: _id });
      dispatch({ type: ADD_TODO, payload: res.data.todo });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await axios.delete(`/todo/${id}`);
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

  // useEffect(function () {
  //   getTodos();
  // }, []);

  // function onChangeHandleTodo(value) {
  //   dispatch({ type: CHANGE_TODO_VALUE, payload: value });
  //   console.log(value);
  // }

  async function loginUser(value) {
    try {
      const res = await axios.post("/user/login", value);
      const data = await res.data;
      const user = data.user;
      const token = data.token;
      addUserToLocalStorage({ user, token });
      dispatch({ type: LOGIN_USER, payload: data });
      toast.success(data.message);
      redirect("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function signUpUser(data) {
    try {
      const res = await axios.post("/user/register", data);
      const d = await res.data;
      const { user, token } = d;
      addUserToLocalStorage({ user, token });
      dispatch({ type: SIGNUP_USER, payload: d });
      redirect("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function logoutUser() {
    dispatch({ type: LOGOUT_USER });
    toast.success("User logout");
    removerUserFromLocalStorage();
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
