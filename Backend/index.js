import express from 'express';
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();


// CORS middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


//middleware
app.use(express.json());
app.use(cookieParser()); 

// routes
app.use("/api/auth",authRouter)
app.use("/api/user" ,userRouter)
const port = process.env.PORT || 5000;


//connect the database 
app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);
});