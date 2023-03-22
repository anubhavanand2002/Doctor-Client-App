//int this file we were setting middlewares,routes
import cors from "cors";//permision from frontend to bacckend
import express from "express";
import  userAuth from "./routes/userRoutes.js";
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',userAuth)
export default app;

