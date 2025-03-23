import express from 'express'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js'


const port = 5000

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.use('/api/task',(req,res)=>{
    res.send("server is listening on 5000");
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.log(err));

