import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import todoRoute from "./routes/todoRoute.js";
import { connectDB } from "./db/config.js";
import userRoute from "./routes/userRoute.js";
import authenticateUser from "./middlewares/auth.js";
// import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve("client/dist")));

const PORT = process.env.PORT || 5555;
const MONGO_DB_URL = process.env.MONGO_DB_URL || "";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use("/v1/api/todo", authenticateUser, todoRoute);
app.use("/v1/api/user", userRoute);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

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
