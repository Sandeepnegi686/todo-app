export const ADD_TODO = "ADD_TODO";
export const SET_TODO_IN_STATE = "SET_TODO_IN_STATE";

export const EDIT_TODO = "EDIT_TODO";

export const DELETE_TODO = "DELETE_TODO";

export const CHANGE_TODO_VALUE = "CHANGE_TODO_VALUE";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const LOGOUT_USER = "LOGOUT_USER";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  todos: [],
  todo: "",
  token: token || "",
  user: JSON.parse(user) || "",
};
