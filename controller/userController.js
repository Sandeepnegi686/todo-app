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
    return res
      .status(201)
      .json({ message: "user created successfully", newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid email format" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
}

export { createUser };
