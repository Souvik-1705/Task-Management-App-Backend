import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();
connectDB();

const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoute);
app.use("/api/tasks",taskRoute);

app.get("/",(req,res)=>{
    res.send("Backend is running");
})

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
