import express from "express";
import dotenv from "dotenv";

import todoRoute from "./routes/todoRoute.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5555;

app.use("/v1/api/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is started on port : ${PORT}`);
});
