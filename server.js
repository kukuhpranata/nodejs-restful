import 'dotenv/config';
import app from './app.js';
import config from './config/env.config.js';
import log from './utils/logger.js';
import process from 'process';

const PORT = config.PORT;

const server = app.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
    log.info(`Environment: ${config.NODE_ENV}`);
    log.info('Ready to handle requests...');
});

process.on('SIGTERM', () => {
    log.warn('SIGTERM signal received: Closing HTTP server');
    server.close(() => {
        log.warn('HTTP server closed.');
    });
});