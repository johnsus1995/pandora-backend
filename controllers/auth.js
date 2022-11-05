import User from "../models/User.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { createError } from "../utils.js/error.js";

export const createUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("New user created successfully");
  } catch (error) {
    next(error);
  }
};

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.email });
//     if(!user){
//         // return next(createError(404,"User does not exist"))
//     }
//   } catch (err) {
//     next(err)
//   }
// };