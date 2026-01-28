/**
 * Testimonial Controller
 * HTTP handlers for testimonial CRUD operations
 */

import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { TestimonialService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendCreated, sendPaginated, sendNoContent } from '../utils/response';
import { getFileUrl } from '../config/multer';

export class TestimonialController {
    static getAll = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const result = await TestimonialService.getAll(req.query);
        sendPaginated(res, result.data, result.pagination);
    });

    static getById = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const testimonial = await TestimonialService.getById(req.params.id as string);
        sendSuccess(res, testimonial);
    });

    static getFeatured = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const limit = parseInt(req.query.limit as string) || 6;
        const testimonials = await TestimonialService.getFeatured(limit);
        sendSuccess(res, testimonials);
    });

    static create = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        let avatarUrl: string | undefined;

        if (req.file) {
            avatarUrl = getFileUrl(req.file.filename, 'avatars');
        }

        const testimonial = await TestimonialService.create(req.body, avatarUrl);
        sendCreated(res, testimonial, 'Testimonial created successfully');
    });

    static update = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        let avatarUrl: string | undefined;

        if (req.file) {
            avatarUrl = getFileUrl(req.file.filename, 'avatars');
        }

        const testimonial = await TestimonialService.update(req.params.id as string, req.body, avatarUrl);
        sendSuccess(res, testimonial, 'Testimonial updated successfully');
    });

    static delete = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        await TestimonialService.delete(req.params.id as string);
        sendNoContent(res);
    });
}
