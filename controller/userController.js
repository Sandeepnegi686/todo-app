import TodoModel from "../model/Todo.js";
import userModel from "../model/User.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, "..", "uploads");
// console.log(filePath);

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
      user: {
        name: newUser.name,
        email: newUser.email,
        profileImg: newUser.profileImg,
      },
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
      profileImg: user.profileImg,
    },
    token,
    todos,
  });
}

async function updateUserDetail(req, res) {
  try {
    const { name, email } = req.body;
    const createdBy = req.userId;
    if (!name || !email) {
      return res.status(400).json({ message: "all fields are required" });
    }

    //Checking someone is using email or not
    const existingUser = await userModel.findOne({ _id: createdBy });
    if (existingUser.email === email) {
      existingUser.name = name;
      await existingUser.save();
      const token = existingUser.createJWT();

      return res.status(200).json({
        message: "User Updated",
        user: {
          name: existingUser.name,
          email: existingUser.email,
          profileImg: existingUser.profileImg,
        },
        token,
      });
    }

    const anyUserUsingEmail = await userModel.findOne({ email });
    if (anyUserUsingEmail) {
      return res.status(400).json({ message: "Email already is in use." });
    }

    existingUser.name = name;
    existingUser.email = email;
    await existingUser.save();
    const token = existingUser.createJWT();

    return res.status(200).json({
      message: "User Updated",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        profileImg: existingUser.profileImg,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid email format" });
    }
    return res.status(500).json({ message: "Server error", error });
  }
}

async function updateUserPass(req, res) {
  const { oldPassword, newPassword } = req.body;
  const createdBy = req.userId;

  if (!newPassword || !oldPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (newPassword === oldPassword) {
    return res.status(400).json({ message: "Passwords are same" });
  }

  const user = await userModel.findOne({ _id: createdBy }).select("+password");

  const correctOldPass = await user.comparePasswords(oldPassword.toString());

  if (!correctOldPass) {
    return res.status(400).json({ message: "Old password is not correct" });
  }

  user.password = newPassword;
  await user.save();
  // const token = user.createJWT();

  return res.status(200).json({ message: "password change" });
}

async function updateUserProfileImg(req, res) {
  try {
    const createdBy = req.userId;
    // Check if a file is uploaded
    if (!req.fileName) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Extract the file name from the request
    const fileName = req.fileName;
    // Update the user's profile image in the database
    const user = await userModel.findOne({ _id: createdBy });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //  ===> "/uploads/demo-profile.jpg  this is user first/default image.
    if (user.profileImg === "/uploads/demo-profile.jpg") {
      //user is changing image first time.
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: createdBy },
        { profileImg: `/uploads/${fileName}` },
        { new: true }
      );
      return res.status(201).json({
        message: "Profile photo updated",
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          profileImg: updatedUser.profileImg,
        },
      });
    } else {
      // user changing more than one time.
      //finding and deleting the image from the server.
      const filePath = path.join(__dirname, "../", user.profileImg);
      fs.unlink(filePath, (err) => {
        if (err) return res.status(400).json({ message: "No file uploaded" });
      });
      //Now we upload a new file.
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: createdBy },
        { profileImg: `/uploads/${fileName}` },
        { new: true }
      );
      return res.status(201).json({
        message: "Profile photo updated",
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          profileImg: updatedUser.profileImg,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
}

export {
  createUser,
  loginUser,
  updateUserDetail,
  updateUserPass,
  updateUserProfileImg,
};
