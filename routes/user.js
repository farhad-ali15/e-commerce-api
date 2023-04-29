import express from "express";
import {
  isAuthenticatedUser,
  isAuthorizedUser,
} from "../middlewares/authHandler.js";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserStats,
  createNewUser,
} from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.route("/add-user").post(createNewUser);
userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUserById);
userRouter.route("/update-user/:id").put(updateUser);
userRouter.route("/delete-user/:id").delete(deleteUser);
userRouter.route("/monthly/stats").get(getUserStats);

export default userRouter;
