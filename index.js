import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./dbConfig/config.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import stripeRouter from "./routes/stripe.js";

dotenv.config();
config();
const app = express();
app.use(bodyParser.json()); // Global middleware
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4000"] }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is running at port number:${process.env.PORT}`);
});
