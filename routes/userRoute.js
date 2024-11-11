import express from "express";
import {
  createUser,
  loginUser,
  updateUserDetail,
} from "../controller/userController.js";
import authenticateUser from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.post("/register", createUser);

userRoute.post("/login", loginUser);

userRoute.patch("/updateUserDetail", authenticateUser, updateUserDetail);

export default userRoute;
