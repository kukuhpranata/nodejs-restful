import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import * as userModel from '../models/user.model.js';
import log from '../utils/logger.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        log.warn('Access denied: No token provided');
        return ApiResponse.unauthorized(res, 'Access denied. Please log in to get access.');
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const currentUser = await userModel.findById(decoded.id);

        if (!currentUser) {
            log.warn(`Token invalid: User with ID ${decoded.id} no longer exists`);
            return ApiResponse.unauthorized(res, 'The user belonging to this token no longer exists.');
        }

        req.user = currentUser;

        log.debug(`Authenticated user ID: ${req.user.id}`);
        next();

    } catch (err) {
        log.error(`JWT verification failed: ${err.message}`);
        return ApiResponse.unauthorized(res, 'Invalid or expired token.');
    }
};