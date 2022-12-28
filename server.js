import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
// import usersRoute from "./routes/users.js";
// import hotelsRoute from "./routes/hotels.js";
// import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.error(error)
    // throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB ");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB connection lost");
});

//middlewares
app.use(cookieParser())
app.use(express.json()); // to use any body in api request
app.use("/api/v1", authRoute);

//custom error handling middleware
// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || "something wrong with api request!";
//   res.status(errStatus).json({
//     success: false,
//     status: errStatus,
//     message: errMessage,
//     // stack: err.stack,
//   });
// });

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`server running on ${process.env.PORT}`);
});

/**
 Finished time stamp
 
 */