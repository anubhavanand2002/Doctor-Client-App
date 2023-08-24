import crypto from "crypto";
import { razorpayInstance } from "../index.js";
import Transaction from "../models/paymentModel.js";

export const getKey = async (req, res) => {
  try {
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error !!" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };

    const order = await razorpayInstance.orders.create(options);

    return res
      .status(200)
      .json({ status: true, message: "Order Created Successfully !", order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const newPayment = new Transaction({
        paymentId: razorpay_payment_id,
        user: user._id,
        amount,
      });

      await newPayment.save();

      res.status(200).json({
        status: true,
        message:
          "Payment Done  Successfully and Your request has been given to the doctor!!",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Payment Failed !!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};
