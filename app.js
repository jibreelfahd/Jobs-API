import express from 'express';
const app = express();

import dotenv from 'dotenv';
import 'express-async-errors'

//security packages
import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';

// app.use('trust proxy', 1);
const rateLimit = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1000
});

app.use(cors('*'));
app.use(xss());
app.use(helmet());
app.use(rateLimit);

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//IMPORTS
import connectDB from './db/index.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFouud from './middleware/notFound.js';
import jobsRouter from './routers/jobs.js';
import authRouter from './routers/auth.js';
import authUser from './middleware/jwt.js';

app.use('/api/v1/jobs', authUser, jobsRouter);
app.use('/api/v1/auth', authRouter);
app.use(notFouud)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5050;
const startApp = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
    } catch (err) {
        console.log(err)
    }
}

startApp();