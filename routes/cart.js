import express from "express";

import {
  getAllCarts,
  updateCart,
  deleteCart,
  getCartById,
  createNewCart,
} from "../controllers/cartcontrollers.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const cartRouter = express.Router();

cartRouter.route("/add-cart").post(verifyToken, createNewCart);
cartRouter.route("/").get(verifyTokenAndAdmin, getAllCarts);
cartRouter.route("/:userId").get(verifyTokenAndAuthorization, getCartById);
cartRouter.route("/update-cart/:id").put(verifyToken, updateCart);
cartRouter
  .route("/delete-Cart/:id")
  .delete(verifyTokenAndAuthorization, deleteCart);

export default cartRouter;
