import express from "express";
import body from "../controllers/userController.js";
const router=express.Router();

const {login,register}=body;
//this /login is the api we have to mention int he frontend part
router.post("/login",login);
router.post("/register",register);

export default router;