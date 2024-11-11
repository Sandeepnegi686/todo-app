export const ADD_TODO = "ADD_TODO";
export const SET_TODO_IN_STATE = "SET_TODO_IN_STATE";

export const EDIT_TODO = "EDIT_TODO";

export const DELETE_TODO = "DELETE_TODO";

export const CHANGE_TODO_VALUE = "CHANGE_TODO_VALUE";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const USER_UPDATE = "USER_UPDATE";

const user = localStorage.getItem("user") ? localStorage.getItem("user") : "";
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
const todos = localStorage.getItem("todos");

export const initialState = {
  todos: JSON.parse(todos) || [],
  todo: "",
  token: token ? JSON.parse(token) : "",
  user: user ? JSON.parse(user) : "",
};
