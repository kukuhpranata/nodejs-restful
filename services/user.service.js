import jwt from 'jsonwebtoken';
import * as userModel from '../models/user.model.js';
import config from '../config/env.config.js';
import log from '../utils/logger.js';
import { ApiResponse } from '../utils/apiResponse.js';

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
    );
};

export const register = async ({ name, email, password }) => {
    const newUser = await userModel.create({ name, email, password });

    if (!newUser) {
        const err = new Error('User with that email already exists.');
        err.status = ApiResponse.HTTP_STATUS.CONFLICT;
        err.isOperational = true;
        throw err;
    }

    const token = createToken(newUser.id);
    log.info(`Service: New user registered: ${newUser.email}`);

    return { user: newUser, token };
};

export const login = async ({ email, password }) => {
    const user = await userModel.findByEmail(email);

    if (!user || !userModel.comparePassword(password, user.password)) {
        const err = new Error('Incorrect email or password.');
        err.status = ApiResponse.HTTP_STATUS.UNAUTHORIZED;
        err.isOperational = true;
        throw err;
    }

    const { password: _, ...userSafeData } = user;
    const token = createToken(userSafeData.id);

    log.info(`Service: User logged in: ${userSafeData.email}`);

    return { user: userSafeData, token };
};

export const updateProfile = async (userId, updates) => {
    const updatedUser = await userModel.update(userId, updates);

    if (!updatedUser) {
        const err = new Error('User not found.');
        err.status = ApiResponse.HTTP_STATUS.NOT_FOUND;
        err.isOperational = true;
        throw err;
    }

    log.info(`Service: User profile updated: ${updatedUser.email}`);
    return updatedUser;
};