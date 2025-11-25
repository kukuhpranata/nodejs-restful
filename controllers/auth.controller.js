import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const err = new Error('Please provide name, email, and password for registration.');
        err.status = ApiResponse.HTTP_STATUS.BAD_REQUEST;
        err.isOperational = true;
        return next(err);
    }

    try {
        const { user, token } = await userService.register({ name, email, password });

        return ApiResponse.success(
            res,
            { user, token },
            'Registration successful.',
            ApiResponse.HTTP_STATUS.CREATED
        );
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const err = new Error('Please provide both email and password.');
        err.status = ApiResponse.HTTP_STATUS.BAD_REQUEST;
        err.isOperational = true;
        return next(err);
    }

    try {
        const { user, token } = await userService.login({ email, password });

        return ApiResponse.success(
            res,
            { user, token },
            'Login successful.'
        );
    } catch (err) {
        next(err);
    }
};