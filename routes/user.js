import express from "express";

import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserStats,
  createNewUser,
} from "../controllers/usercontroller.js";
import {
  
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const userRouter = express.Router();

userRouter.route("/add-user").post(verifyTokenAndAdmin, createNewUser);
userRouter.route("/").get(verifyTokenAndAdmin, getAllUsers);
userRouter.route("/:id").get(verifyTokenAndAdmin, getUserById);
userRouter
  .route("/update-user/:id")
  .put(verifyTokenAndAuthorization, updateUser);
userRouter.route("/delete-user/:id").delete(verifyTokenAndAdmin, deleteUser);
userRouter.route("/monthly/stats").get(verifyTokenAndAdmin, getUserStats);

export default userRouter;
