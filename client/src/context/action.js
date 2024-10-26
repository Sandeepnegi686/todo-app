export const ADD_TODO = "ADD_TODO";
export const CHANGE_TODO_VALUE = "CHANGE_TODO_VALUE";
export const CHANGE_TODO = "CHANGE_TODO";

export const initialState = {
  todos: [
    {
      title: "egg",
      status: "pending",
      id: 1729924564767,
    },
    {
      title: "fruit",
      status: "pending",
      id: 1729930614889,
    },
  ],
  todo: "",
};
