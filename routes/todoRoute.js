import express from "express";
import { getAllTodo } from "../controller/todoController.js";

const todoRoute = express.Router();

todoRoute.get("/", getAllTodo);

export default todoRoute;
