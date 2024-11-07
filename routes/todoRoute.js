import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoByUser,
  editTodo,
} from "../controller/todoController.js";

const todoRoute = express.Router();

todoRoute.get("/", getTodoByUser);

todoRoute.post("/", createTodo);

todoRoute.patch("/:id", editTodo);

todoRoute.delete("/:id", deleteTodo);

export default todoRoute;
