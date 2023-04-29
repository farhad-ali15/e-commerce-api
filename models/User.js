import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please provide the username"],
      minLength: [5, "{VALUE} is not a valid username"],
      unique: [true, "{VALUE} is already in use"],
      minLength: [3, "username must be atleast 3 characters"],
      maxLength: [15, "username must be atmost 15 characters"],
    },
    email: {
      type: String,
      required: [true, "please provide valid email"],
      unique: [true, "{VALUE} is already in use,please provide another email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      lowercase: [true, "all email should be in lowercase"],
    },
    password: {
      type: String,
      required: [true, "please provide password email"],
      minLength: [8, "password must be atleast 8 characters"],
      maxLength: [1000, "password must be atmost 1000 characters"],
    },
    profilePic: {
      type: String,
      default: "",
    },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
