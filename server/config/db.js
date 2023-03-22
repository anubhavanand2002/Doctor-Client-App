//in this file we have to write code to conect to mongo db

import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
