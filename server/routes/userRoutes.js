import express from "express";
import {
  login,
  register,
  authController,
  authDoctorController,
  authgetAllNotificationController,
  authdeleteAllNotificationController
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//this /login is the api we have to mention int he frontend part
router.post("/login", login);
router.post("/register", register);
router.post("/getUserData", authMiddleware, authController);
router.post("/apply-doctor", authMiddleware, authDoctorController);
router.post("/get-all-notification",authMiddleware,authgetAllNotificationController);
router.post("/delete-all-notification",authMiddleware,authdeleteAllNotificationController);
export default router;
