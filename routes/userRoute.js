import express from "express";
import {
  createUser,
  loginUser,
  updateUserDetail,
  updateUserPass,
  updateUserProfileImg,
} from "../controller/userController.js";
import authenticateUser from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const userRoute = express.Router();

userRoute.post("/register", createUser);

userRoute.post("/login", loginUser);

userRoute.patch("/updateUserDetail", authenticateUser, updateUserDetail);

userRoute.patch("/updateUserPass", authenticateUser, updateUserPass);

userRoute.put(
  "/updateUserProfileImg",
  authenticateUser,
  upload.single("profileImg"),
  updateUserProfileImg
);

//upload.single("profilePicture"),

export default userRoute;
