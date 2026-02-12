import express from 'express';
const app = express();

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

connectDB();

app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
    res.send('home page');
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});