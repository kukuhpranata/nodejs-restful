import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.route('/me')
    .get(getProfile)
    .patch(updateProfile);

export default router;