import { Pagination } from '@application/features/ui';

export interface PaginateOptions<F = any> {
    filter?: F
    pagination: Pagination
    search: string
}

export interface SendEmailOptions {
    email: string;
    imageUrl?: string;
    message: string;
    templateId: string;
}

/**
 * Type representing the camera type that can be used with the camera service.
 * - 'back': The back camera of the device.
 * - 'front': The front camera of the device.
 */
export type CameraType = 'back' | 'front';