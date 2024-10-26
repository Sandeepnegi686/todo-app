import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
} from "../controller/todoController.js";

const todoRoute = express.Router();

todoRoute.get("/", getAllTodo);

todoRoute.post("/", createTodo);

todoRoute.delete("/:id", deleteTodo);

export default todoRoute;
