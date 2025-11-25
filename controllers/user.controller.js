import * as userService from '../services/user.service.js'; // <-- NEW Service Import
import { ApiResponse } from '../utils/apiResponse.js';


export const getProfile = (req, res) => {
    return ApiResponse.success(res, req.user, 'Profile data retrieved.');
};

export const updateProfile = async (req, res, next) => {
    const userId = req.user.id;
    const updates = req.body;

    if (updates.password) {
        const err = new Error('Password cannot be updated through this route. Use a dedicated password update route.');
        err.status = ApiResponse.HTTP_STATUS.BAD_REQUEST;
        err.isOperational = true;
        return next(err);
    }

    try {
        const updatedUser = await userService.updateProfile(userId, updates);

        return ApiResponse.success(
            res,
            updatedUser,
            'Profile updated successfully.'
        );
    } catch (err) {
        next(err);
    }
};