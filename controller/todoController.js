import mongoose from "mongoose";
import TodoModel from "../model/Todo.js";

async function getAllTodo(req, res) {
  try {
    const todos = await TodoModel.find();
    if (todos.length === 0)
      return res.status(200).json({ message: "No todos found" });
    return res
      .status(200)
      .json({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    console.log(error);
  }
}

async function createTodo(req, res) {
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).json({ message: "Please provide a todo" });

    const todo = TodoModel({ title });
    await todo.save();

    return res
      .status(201)
      .json({ message: "Todo is created successfully", todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.statud(400).json({ message: "Invalid ID" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID " });
    }

    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(400).json({ message: "Todo not found" });

    await todo.deleteOne();
    return res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export { getAllTodo, createTodo, deleteTodo };
