import dotenv from "dotenv";

dotenv.config();
import "dotenv/config";

import express from 'express';
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from './routes/user.routes.js';
import geminiResponse from "./gemeni.js"

// dotenv.config();

const app = express();


// CORS middleware
app.use(cors({
    origin:"https://mitra-ai-virtual-assistant-1.onrender.com",
    credentials:true
}))


//middleware
app.use(express.json());
app.use(cookieParser()); 

// routes
app.use("/api/auth",authRouter)
app.use("/api/user" ,userRouter)
const port = process.env.PORT || 5000;


/* to get the ans from gemini
app.get("/", async (req, res) => {
    try {
        const prompt = req.query.prompt;

        const data = await geminiResponse(prompt);
        console.log("DATA:", data);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Gemini route error"
        });
    }
}); */


//connect the database 
app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);
});
