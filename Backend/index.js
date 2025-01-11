import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
const app  = express();
import authRoutes  from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { varifyToken } from './middleware/generateToken.js';
import 'dotenv/config';
connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks",varifyToken, taskRoutes);


app.listen(5000, (err,res)=>console.log("server is listening on port "+ 5000));
