// import express from 'express';
// import cors from 'cors';
// import './config/db.js';
// import taskRouter from './routes/taskRoutes.js';
// import clientRouter from './routes/clientRoutes.js';

// const app = express();
// const port = 5050;

// app.use(express.json());
// app.use(cors());
// app.use('/tasks', taskRouter);
// app.use('/clients', clientRouter);

// app.listen(port, () => {
//     console.log(
//         `Server listening on port ${port} and startting at http://localhost:${port}`,
//     );
// });

// export default app;

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 
import taskRouter from './routes/taskRoutes.js';
import clientRouter from './routes/clientRoutes.js';

const app = express();
const port = 5050;

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({
            message: 'Database connection failed',
            error: err.message,
        });
    }
});

app.use('/tasks', taskRouter);
app.use('/clients', clientRouter);

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

export default app;
