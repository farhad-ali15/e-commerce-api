import { Order } from "../models/Order.js";

// create an Order

export const createNewOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    if (order) {
      res.json({
        message: "new order has been created",
      });
      console.log(order);
    }
  } catch (err) {
    next(err);
  }
};

//get all Orders
export const getAllOrders = async (req, res, next) => {
  try {
    let orders;

    orders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update an order
export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({
    message: " Order has been updated",
  });
  res.send(updatedOrder);
};

//get order by id

export const getOrdersById = async (req, res, next) => {
  const { userId } = req.params.userId;
  const orders = await Order.find(userId);

  res.send(orders);
};

// delete an order by id

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);

    res.send("Order deleted");
  } catch (err) {
    next(err);
  }
};

// GET MONTHLY INCOME

export const getOrderStats = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log(income);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
