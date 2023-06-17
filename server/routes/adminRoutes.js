import express from "express";
import { authgetAllDoctorsController } from "../controllers/adminController.js";
import { authgetAllUsersController } from "../controllers/adminController.js";
import { changeAccountStatusController } from "../controllers/adminController.js";
const router = express.Router();

import { authMiddleware } from "../middlewares/authMiddleware.js";

//getting the user details
router.get("/getAllUsers", authMiddleware, authgetAllUsersController);

//getting all doctors
router.get("/getAllDoctors", authMiddleware, authgetAllDoctorsController);


//changing account status
router.post("/changeAccountStatus",authMiddleware,changeAccountStatusController);
export default router;
