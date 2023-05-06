import express from "express";
import { createNewPayment } from "../controllers/paymentcontroller.js";
import { verifyToken } from "./verifyToken.js";

const stripeRouter = express.Router();

stripeRouter.route("/payment").post(createNewPayment);

export default stripeRouter;
