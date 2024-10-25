import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide todo"],
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const TodoModel = mongoose.model("todo", todoSchema);

export default TodoModel;
