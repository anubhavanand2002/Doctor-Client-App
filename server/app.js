//int this file we were setting middlewares,routes
import cors from "cors"; //permision from frontend to bacckend
import express from "express";
import userAuth from "./routes/userRoutes.js";
import adminAuth from "./routes/adminRoutes.js";
import paymentAuth from "./routes/paymentRoute.js";
import doctorAuth from "./routes/doctorRoutes.js";
import fileUpload from "express-fileupload";
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", userAuth);
app.use("/api/admin", adminAuth);
app.use("/api/doctor", doctorAuth);
app.use("/api/payment", paymentAuth);
export default app;
