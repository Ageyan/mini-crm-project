import express from 'express';
import cors from 'cors';
import './config/db.js';
import taskRouter from './routes/taskRoutes.js'
import clientRouter from './routes/clientRoutes.js'


const app = express();
const port = 5050;

app.use(express.json());
app.use(cors())
app.use('/tasks', taskRouter)
app.use('/clients', clientRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port} and startting at http://localhost:${port}`)
})