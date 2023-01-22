import mongoose from "mongoose";
const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);


export default Customer;
