import { User } from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const newUser = async (req, res, next) => {
  try {
    let myPlaintextPassword = req.body.password;

    const hash = await CryptoJS.AES.encrypt(
      myPlaintextPassword,
      process.env.PASS_SEC
    ).toString();

    req.body.password = hash;
    const user = await User.create(req.body);
    if (user) {
      res.json({
        message: "new user has been created",
      });
    }
  } catch (err) {
    next(err);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName) {
      return next(new Error("please provide correct username!"));
    }
    if (!password) {
      return next(new Error("please provide password!"));
    }
    let user = await User.findOne({ userName });

    if (!user) {
      return next(
        new Error(
          "no user with this username found, please create account to login!"
        )
      );
    }

    // Decrypt
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass_word = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (pass_word !== req.body.password) {
      return next(new Error("password is incorrect!"));
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1500000,
      })
      .json(user);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true }).json({
    message: "Logged Out",
  });
};
