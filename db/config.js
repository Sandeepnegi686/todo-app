import mongoose from "mongoose";

function connectDB(url) {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
}

export { connectDB };
