import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminroutes.js';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// database connection
db();


import moviesRoute from './routes/moviesroute.js';
import { startWorker } from './services/queueWorker.js';

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', moviesRoute);

import { errorHandler } from './middleware/errorMiddleware.js';

// Start Queue Worker
startWorker();

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
})