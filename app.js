import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import todoRoute from "./routes/todoRoute.js";
import { connectDB } from "./db/config.js";
import morgan from "morgan";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5555;
const MONGO_DB_URL = process.env.MONGO_DB_URL || 5555;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use("/v1/api/todo", todoRoute);

async function start() {
  try {
    await connectDB(MONGO_DB_URL).then(() => console.log("DB connected."));
    app.listen(PORT, function () {
      console.log(`server running at ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
