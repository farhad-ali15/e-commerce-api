import { Product } from "../models/Product.js";

// create a Product

export const createNewProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (product) {
      res.json({
        message: "new Product has been created",
      });
    }
  } catch (err) {
    next(err);
  }
};

//get all Products
export const getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update a Product
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.send(updatedProduct);
};

//get Product by id

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.send(product);
};

// delete a Product by id

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    res.send("Product deleted");
  } catch (err) {
    next(err);
  }
};
