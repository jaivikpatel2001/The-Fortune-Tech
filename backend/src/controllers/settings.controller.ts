/**
 * Settings Controller
 * HTTP handlers for website configuration operations
 */

import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { SettingsService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/response';

export class SettingsController {
    /**
     * Get website configuration
     * GET /api/settings
     */
    static get = asyncHandler(async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
        const config = await SettingsService.get();
        sendSuccess(res, config);
    });

    /**
     * Update website configuration
     * PUT /api/settings (multipart/form-data)
     */
    static update = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const config = await SettingsService.update(req.body);
        sendSuccess(res, config, 'Settings updated successfully');
    });
}
