import express from "express";
import { createUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/", createUser);

export default userRoute;
