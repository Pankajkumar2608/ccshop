import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import userRoute from './routes/userRoute.js';
const prisma = new PrismaClient();


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://www.pankaj.bio'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
dotenv.config();

app.use('/api', userRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));