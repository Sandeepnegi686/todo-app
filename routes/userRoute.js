import express from "express";
import {
  createUser,
  loginUser,
  updateUserDetail,
  updateUserPass,
} from "../controller/userController.js";
import authenticateUser from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const userRoute = express.Router();

userRoute.post("/register", createUser);

userRoute.post("/login", loginUser);

userRoute.patch("/updateUserDetail", authenticateUser, updateUserDetail);

userRoute.patch("/updateUserPass", authenticateUser, updateUserPass);

//upload.single("profilePicture"),

export default userRoute;
