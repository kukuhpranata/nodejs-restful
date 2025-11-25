import express from 'express';
import log from './utils/logger.js';
import errorMiddleware from './middleware/error.middleware.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    log.debug(`[${req.method}] ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Express API (ESM)',
        status: 'OK'
    });
});

app.use((req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 404;
    err.isOperational = true;
    next(err);
});

app.use(errorMiddleware);

export default app;