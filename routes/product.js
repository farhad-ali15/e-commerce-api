import express from "express";

import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createNewProduct,
} from "../controllers/productcontroller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(verifyTokenAndAdmin, createNewProduct);
productRouter.route("/").get(verifyTokenAndAuthorization, getAllProducts);
productRouter.route("/:id").get(verifyTokenAndAuthorization, getProductById);
productRouter
  .route("/update-product/:id")
  .put(verifyTokenAndAdmin, updateProduct);
productRouter
  .route("/delete-product/:id")
  .delete(verifyTokenAndAdmin, deleteProduct);

export default productRouter;
