import express from "express";
import {
  createUser,
  loginUser,
  updateUserDetail,
} from "../controller/userController.js";
import authenticateUser from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const userRoute = express.Router();

userRoute.post("/register", createUser);

userRoute.post("/login", loginUser);

userRoute.patch(
  "/updateUserDetail",
  authenticateUser,
  upload.single("profilePicture"),
  updateUserDetail
);

export default userRoute;
