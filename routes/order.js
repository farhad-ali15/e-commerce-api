import express from "express";

import {
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrdersById,
  createNewOrder,
} from "../controllers/ordercontrollers.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const orderRouter = express.Router();

orderRouter.route("/add-order").post(verifyToken, createNewOrder);
orderRouter.route("/").get(verifyTokenAndAdmin, getAllOrders);
orderRouter.route("/:userId").get(verifyTokenAndAuthorization, getOrdersById);
orderRouter.route("/update-order/:id").put(verifyToken, updateOrder);
orderRouter
  .route("/delete-order/:id")
  .delete(verifyTokenAndAuthorization, deleteOrder);

export default orderRouter;
