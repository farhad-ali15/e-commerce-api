import express from "express";
import {
  isAuthenticatedUser,
  isAuthorizedUser,
} from "../middlewares/authHandler.js";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  createNewProduct,
} from "../controllers/productcontroller.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(createNewProduct);
productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getProductById);
productRouter.route("/update-product/:id").put(updateProduct);
productRouter.route("/delete-product/:id").delete(deleteProduct);

export default productRouter;
