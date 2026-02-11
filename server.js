import express from 'express';
const app = express();

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

connectDB();

app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
    res.send('home page');
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});