import { Cart } from "../models/Cart.js";

// create a Product

export const createNewCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    if (cart) {
      res.json({
        message: "new cart has been created",
      });
      console.log(cart);
    }
  } catch (err) {
    next(err);
  }
};

//get all Products
export const getAllCarts = async (req, res, next) => {
  try {
    let carts;

    carts = await Cart.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a Product
export const updateCart = async (req, res, next) => {
  const { id } = req.params;
  const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    message: " cart has been updated",
  });
  res.send(updatedCart);
};

//get Cart by id

export const getCartById = async (req, res, next) => {
  const { userId } = req.params.userId;
  const cart = await Cart.findOne(userId);

  res.send(cart);
};

// delete a Cart by id

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);

    res.send("Cart deleted");
  } catch (err) {
    next(err);
  }
};
