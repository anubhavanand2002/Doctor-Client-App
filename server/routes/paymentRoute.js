import express from "express";
import {
  checkout,
  getKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/get-key", getKey);
router.post("/checkout", checkout);
router.post("/payment-verification", paymentVerification);

export default router;
