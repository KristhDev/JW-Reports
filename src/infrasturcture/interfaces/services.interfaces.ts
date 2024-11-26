import { Pagination } from '@application/features';

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