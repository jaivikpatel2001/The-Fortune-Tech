/**
 * Service Routes
 * Service CRUD endpoints with multipart/form-data support
 */

import { Router } from 'express';
import { ServiceController } from '../controllers';
import { validate, authenticate, requirePermissions, singleImage } from '../middlewares';
import { createServiceSchema, updateServiceSchema, serviceIdSchema, serviceQuerySchema } from '../dtos';
import { PERMISSIONS } from '../constants';

const router = Router();

// Public routes
router.get('/', validate(serviceQuerySchema, 'query'), ServiceController.getAll);
router.get('/featured', ServiceController.getFeatured);
router.get('/:id', validate(serviceIdSchema, 'params'), ServiceController.getById);

// Protected routes (require authentication)
router.post(
    '/',
    authenticate,
    requirePermissions(PERMISSIONS.CREATE_SERVICES),
    singleImage('image'),
    validate(createServiceSchema),
    ServiceController.create
);

router.put(
    '/:id',
    authenticate,
    requirePermissions(PERMISSIONS.EDIT_SERVICES),
    singleImage('image'),
    validate(serviceIdSchema, 'params'),
    validate(updateServiceSchema),
    ServiceController.update
);

router.delete(
    '/:id',
    authenticate,
    requirePermissions(PERMISSIONS.DELETE_SERVICES),
    validate(serviceIdSchema, 'params'),
    ServiceController.delete
);

export default router;
