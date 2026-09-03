import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import connectDB from './config/db.js'; 
import taskRouter from './routes/taskRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import authRouter from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js'

const app = express();
const port = process.env.PORT || 5050;

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use('/tasks', protect, taskRouter);
app.use('/clients', protect, clientRouter);
app.use('/login', authRouter);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
