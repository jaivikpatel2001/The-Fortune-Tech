/**
 * Testimonial Routes
 */

import { Router } from 'express';
import { TestimonialController } from '../controllers';
import { validate, authenticate, requirePermissions, singleImage } from '../middlewares';
import { createTestimonialSchema, updateTestimonialSchema, testimonialIdSchema, testimonialQuerySchema } from '../dtos';
import { PERMISSIONS } from '../constants';

const router = Router();

// Public routes
router.get('/', validate(testimonialQuerySchema, 'query'), TestimonialController.getAll);
router.get('/featured', TestimonialController.getFeatured);
router.get('/:id', validate(testimonialIdSchema, 'params'), TestimonialController.getById);

// Protected routes
router.post(
    '/',
    authenticate,
    requirePermissions(PERMISSIONS.CREATE_TESTIMONIALS),
    singleImage('avatar'),
    validate(createTestimonialSchema),
    TestimonialController.create
);

router.put(
    '/:id',
    authenticate,
    requirePermissions(PERMISSIONS.EDIT_TESTIMONIALS),
    singleImage('avatar'),
    validate(testimonialIdSchema, 'params'),
    validate(updateTestimonialSchema),
    TestimonialController.update
);

router.delete(
    '/:id',
    authenticate,
    requirePermissions(PERMISSIONS.DELETE_TESTIMONIALS),
    validate(testimonialIdSchema, 'params'),
    TestimonialController.delete
);

export default router;
