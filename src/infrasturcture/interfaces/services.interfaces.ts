import { Pagination } from '@application/features';

export interface GetAllOptions<F = any> {
    filter?: F
    pagination: Pagination
    search: string
}