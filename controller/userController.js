import TodoModel from "../model/Todo.js";
import userModel from "../model/User.js";

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const newUser = userModel({ name, email, password });
    await newUser.save();
    newUser.password = undefined;
    const token = newUser.createJWT();

    return res.status(201).json({
      message: "user created successfully",
      user: { name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid email format" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({ message: "Credentials invalid" });
  }

  const todos = await TodoModel.find({ createdBy: user?._id });

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Credentials invalid" });
  }
  user.password = undefined;
  const token = user.createJWT();
  return res.status(200).json({
    message: "Login Successfull",
    user: {
      name: user.name,
      email: user.email,
      _id: user._id,
    },
    token,
    todos,
  });
}

export { createUser, loginUser };
