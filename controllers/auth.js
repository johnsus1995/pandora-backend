import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
// import jwt from "jsonwebtoken";
// import { createError } from "../utils.js/error.js";

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const savedUser = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });
    await savedUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error); //go to next middleware
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "user not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "invalid username or password"));

    const token = jwt.sign({id:user._doc._id,},process.env.JWT_SECRET_KEY)

    const {password,...rest} = user._doc

    res.status(200).json({...rest});
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate();
  } catch (error) {}
};
