import express from "express";

import {
  newUser,
  loginUser,
  logoutUser,
} from "../controllers/authcontroller.js";

const authRouter = express.Router();
authRouter.route("/register").post(newUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logoutUser);

export default authRouter;
