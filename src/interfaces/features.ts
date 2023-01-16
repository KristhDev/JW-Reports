import { Pagination } from './ui';

export type SetIsLoadingPayload = {
    isLoading: boolean;
}

export type SetIsDeletingPayload = {
    isDeleting: boolean;
}

export type RemoveResourcePayload = {
    id: string;
}

export type HistoryPayload = {
    newScreen: string;
}

export type PaginationPayload = {
    pagination: Pagination;
}

export type HasMorePayload = {
    hasMore: boolean;
}
