import log from '../utils/logger.js';
import config from '../config/env.config.js';
import { ApiResponse } from '../utils/apiResponse.js';

export default (err, req, res, next) => {
    log.error('--- Global Error Handler ---');
    log.error(`Status: ${err.status || 500}, Message: ${err.message}`);

    if (config.NODE_ENV === 'development' && !err.isOperational) {
        log.error('Stack Trace:', err.stack);
    }
    log.error('----------------------------');

    const statusCode = err.status || ApiResponse.HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const message = err.isOperational || config.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong on the server.';

    return ApiResponse.error(res, message, statusCode);
};