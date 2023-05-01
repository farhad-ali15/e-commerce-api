import { User } from "../models/User.js";
import CryptoJS from "crypto-js";

//get all users / get users by querry
export const getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  const allUsers = query
    ? await User.find().sort({ _id: -1 }).limit(6)
    : await User.find();
  res.json(allUsers);
};

// update a user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  const { password, ...others } = updatedUser._doc;
  res.send(others);
};

//get user by id

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.send(user);
};

// delete a user by id

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.send("User deleted");
  } catch (err) {
    next(err);
  }
};

// get user stats

export const getUserStats = async (req, res, next) => {
  const today = new Date();

  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.send(data);
  } catch (error) {
    next(error);
  }
};
// create a user

export const createNewUser = async (req, res, next) => {
  try {
    let myPlaintextPassword = req.body.password;

    const hash = await CryptoJS.AES.encrypt(
      myPlaintextPassword,
      process.env.PASS_SEC
    ).toString();

    req.body.password = hash;
    const user = await User.create(req.body);
    if (user) {
      res.json({
        message: "new user has been created",
      });
    }
  } catch (err) {
    next(err);
  }
};
