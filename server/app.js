//int this file we were setting middlewares,routes
import cors from "cors"; //permision from frontend to bacckend
import express from "express";
import userAuth from "./routes/userRoutes.js";
import adminAuth from "./routes/adminRoutes.js";
import doctorAuth from "./routes/doctorRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", userAuth);
app.use("/api/admin", adminAuth);
app.use("/api/doctor", doctorAuth);
export default app;
