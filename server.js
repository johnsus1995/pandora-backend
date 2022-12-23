import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
// import usersRoute from "./routes/users.js";
// import hotelsRoute from "./routes/hotels.js";
// import roomsRoute from "./routes/rooms.js";
// import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    // console.log(error)
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB ");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB connection lost");
});

app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.use((err, req, res, next) => {
  //custom error handling middleware
  const errStatus = err.status || 500;
  const errMessage = err.message || "something wrong with api request!";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    // stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("server running on 8800");
});
