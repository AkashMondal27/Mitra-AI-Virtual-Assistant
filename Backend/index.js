import express from 'express';
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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
const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);
});