import mongoose from "mongoose";
import TodoModel from "../model/Todo.js";

async function getTodoByUser(req, res) {
  try {
    const id = req.userId;
    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const todos = await TodoModel.find({ createdBy: id });
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
    const createdBy = req.userId;
    if (!title || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const todo = TodoModel({ title, createdBy });
    await todo.save();

    return res
      .status(201)
      .json({ message: "Todo is created successfully", todo });
  } catch (error) {
    return res.status(500).json({ message: "Error creating todo" });
  }
}

async function editTodo(req, res) {
  try {
    console.log("code run");
    const { id } = req.params;
    const createdBy = req.userId;
    if (!id) return res.status(400).json({ message: "ID is missing" });

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Not valid ID" });

    const todo = await TodoModel.findOne({ _id: id, createdBy });
    if (!todo) return res.status(400).json({ message: "Todo not found" });
    if (todo.status === "completed") {
      return res.status(400).json({ message: "todo is already completed" });
    }
    todo.status = "completed";
    await todo.save();
    return res.status(200).json({ message: "Todo compeleted", todo });
  } catch (error) {
    console.error("Error editing todo:", error);
    return res.status(500).json({ message: "Server errors" });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const createdBy = req.userId;

    if (!id) {
      return res.status(400).json({ message: "ID is not given" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID " });
    }

    const todo = await TodoModel.deleteOne({ _id: id, createdBy });

    if (todo.deletedCount === 0) {
      return res.status(400).json({ message: "Todo not found" });
    }

    // await todo.deleteOne();
    return res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    return res.status(500).json({ message: "Server errors" });
  }
}

export { getTodoByUser, createTodo, deleteTodo, editTodo };
