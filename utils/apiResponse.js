import log from './logger.js';

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

const sendResponse = (res, success, message, data, errors, statusCode) => {
    let response = { success, message };

    if (data !== undefined && data !== null) {
        response.data = data;
    }
    if (errors !== undefined && errors !== null) {
        response.errors = errors;
    }

    if (message === null) {
        delete response.message;
    }

    log.debug(`Sending response | Status: ${statusCode} | Success: ${success}`);

    return res.status(statusCode).json(response);
};

export const ApiResponse = {
    success: (res, data = null, message = null, statusCode = HTTP_STATUS.OK) => {
        if (statusCode === HTTP_STATUS.OK && !message) {
            message = 'Request successful.';
        }
        return sendResponse(res, true, message, data, null, statusCode);
    },

    error: (res, message, statusCode = HTTP_STATUS.BAD_REQUEST, errors = null) => {
        return sendResponse(res, false, message, null, errors, statusCode);
    },

    notFound: (res, message = 'Resource not found.') => {
        return ApiResponse.error(res, message, HTTP_STATUS.NOT_FOUND);
    },

    unauthorized: (res, message = 'Unauthorized access.') => {
        return ApiResponse.error(res, message, HTTP_STATUS.UNAUTHORIZED);
    },

    forbidden: (res, message = 'Access forbidden.') => {
        return ApiResponse.error(res, message, HTTP_STATUS.FORBIDDEN);
    },

    validationError: (res, errors, message = 'Validation failed.') => {
        return ApiResponse.error(res, message, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
    },

    internalServerError: (res, message = 'Internal server error.') => {
        return ApiResponse.error(res, message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    },

    HTTP_STATUS
};