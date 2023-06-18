import express from "express";
const router = express.Router();
import {
  getDoctorInfoController,
  updateDoctorInfoController,
  getDoctorByIdController,
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//for getting the doctor info using its userId
router.post("/getdoctorInfo", authMiddleware, getDoctorInfoController);

//for updating the doctor data
router.post("/updateDoctorInfo", authMiddleware, updateDoctorInfoController);

//getting docror by doctorId
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);
export default router;
