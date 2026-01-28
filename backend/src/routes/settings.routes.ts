/**
 * Settings Routes
 */

import { Router } from 'express';
import { SettingsController } from '../controllers';
import { validate, authenticate, requirePermissions, formDataOnly } from '../middlewares';
import { updateSettingsSchema } from '../dtos';
import { PERMISSIONS } from '../constants';

const router = Router();

// Public route - get settings (for frontend)
router.get('/', SettingsController.get);

// Protected routes
router.put(
    '/',
    authenticate,
    requirePermissions(PERMISSIONS.EDIT_SETTINGS),
    formDataOnly(),
    validate(updateSettingsSchema),
    SettingsController.update
);

export default router;
