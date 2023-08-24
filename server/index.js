import connectDB from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log("Sever is hosted");
});
