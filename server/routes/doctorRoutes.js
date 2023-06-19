import express from "express";
const router = express.Router();
import {
  getDoctorInfoController,
  updateDoctorInfoController,
  getDoctorByIdController,
  getDoctorAppointmentsController,
  authHandleStatusController
} from "../controllers/doctorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//for getting the doctor info using its userId
router.post("/getdoctorInfo", authMiddleware, getDoctorInfoController);

//for updating the doctor data
router.post("/updateDoctorInfo", authMiddleware, updateDoctorInfoController);

//getting docror by doctorId
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//getting doctors all appointments
router.get("/doctor-appointments",authMiddleware,getDoctorAppointmentsController);

//changing the status
router.post("/handle-status",authMiddleware,authHandleStatusController);
export default router;
