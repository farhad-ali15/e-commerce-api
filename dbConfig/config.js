import mongoose from "mongoose";

export const config = () => {
  mongoose
    .connect(process.env.Mongo_URL)
    .then(() => console.log("db Connected!"));
};
