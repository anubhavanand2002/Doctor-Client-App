import connectDB from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Sever is hosted");
})