import express from "express";
const router=express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/getdoctorInfo",authMiddleware,getDoctorInfoController)
export default router;