import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  editTodo,
} from "../controller/todoController.js";

const todoRoute = express.Router();

todoRoute.get("/", getAllTodo);

todoRoute.post("/", createTodo);

todoRoute.patch("/:id", editTodo);

todoRoute.delete("/:id", deleteTodo);

export default todoRoute;
